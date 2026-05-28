const crypto = require('crypto');
const axios = require('axios');
const moment = require('moment');
const config = require('config');

const APP_ID = config.get('zalopay_app_id');
const KEY1 = config.get('zalopay_key1');
const KEY2 = config.get('zalopay_key2');
const ENDPOINT = config.get('zalopay_endpoint');
const CALLBACK_URL = config.get('zalopay_callback_url');
const REDIRECT_URL = config.get('zalopay_redirect_url');
const QUERY_ENDPOINT = config.has('zalopay_query_endpoint')
  ? config.get('zalopay_query_endpoint')
  : 'https://sb-openapi.zalopay.vn/v2/query';

exports.createPaymentUrl = async (amount, orderId, userId = 'motor_user', redirectUrl = REDIRECT_URL) => {
  const cleanOrderId = orderId.replace(/-/g, '');
  const appTransId = `${moment().format('YYMMDD')}_${cleanOrderId}`;

  const order = {
    app_id: Number(APP_ID),
    app_trans_id: appTransId,
    app_user: userId,
    app_time: Date.now(),
    item: JSON.stringify([]),
    embed_data: JSON.stringify({ orderId, redirecturl: redirectUrl }),
    amount: Number(amount),
    description: `Thanh toan don hang #${orderId}`,
    callback_url: CALLBACK_URL,
  };

  const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = crypto.createHmac('sha256', KEY1).update(data).digest('hex');

  const response = await axios.post(ENDPOINT, order, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('[ZaloPay] API response:', JSON.stringify(response.data));

  if (response.data.return_code !== 1) {
    throw new Error(response.data.sub_return_message || response.data.return_message || 'ZaloPay error');
  }

  return {
    app_trans_id: appTransId,
    order_url: response.data.order_url,
    zp_trans_token: response.data.zp_trans_token,
    order_token: response.data.order_token,
    qr_code: response.data.qr_code,
  };
};

exports.queryPaymentStatus = async (appTransId) => {
  const postData = {
    app_id: Number(APP_ID),
    app_trans_id: appTransId,
  };
  const data = `${postData.app_id}|${postData.app_trans_id}|${KEY1}`;
  postData.mac = crypto.createHmac('sha256', KEY1).update(data).digest('hex');

  const response = await axios.post(QUERY_ENDPOINT, postData, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('[ZaloPay] Query response:', JSON.stringify(response.data));
  return response.data;
};

exports.verifyCallback = (dataStr, reqMac) => {
  const mac = crypto.createHmac('sha256', KEY2).update(dataStr).digest('hex');
  return mac === reqMac;
};

exports.parseCallbackData = (dataStr) => {
  const data = JSON.parse(dataStr);
  let orderId = '';

  if (data.embed_data) {
    try {
      const embedData = JSON.parse(data.embed_data);
      if (embedData.orderId) orderId = embedData.orderId;
    } catch {}
  }

  if (!orderId) {
    const hexId = data.app_trans_id.substring(7);
    if (hexId.length === 32) {
      orderId = `${hexId.slice(0, 8)}-${hexId.slice(8, 12)}-${hexId.slice(12, 16)}-${hexId.slice(16, 20)}-${hexId.slice(20)}`;
    } else {
      orderId = hexId;
    }
  }

  return {
    orderId,
    amount: Number(data.amount),
    zpTransId: String(data.zp_trans_id),
  };
};
