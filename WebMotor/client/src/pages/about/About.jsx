import React from 'react'

export default function About() {
  return (
    <div id="coolmate-story">
      <section className="cs-banner">
        <div className="cs-banner__image">
          <img src="../Images/hondabanner1.jpg" alt="Banner Motor" />
        </div>
        {/* <div className="cs-banner__content">
          <h1 className="cs-banner__heading">Câu chuyện về Xe Mô Tô</h1>
          <p className="cs-banner__description">Khám phá hành trình và mục tiêu của ngành xe mô tô trong việc phát triển bền vững và kết nối đam mê tốc độ!</p>
        </div> */}
      </section>

      <section className="cs-about">
        <div className="container-medium">
          <div className="grid">
            <div className="grid__column four-twelfths">
              <div className="cs-about__content">
                <h2 className="cs-about__heading">
                  Xe mô tô được tạo ra <br /> để làm gì?
                </h2>
              </div>
              <div className="cs-about__image">
                <img src="../Images/hondabanner2.jpg" alt="" />
              </div>
            </div>
            <div className="grid__column eight-twelfths">
              <div className="cs-about__description">
                <p>Xe mô tô ra đời như một biểu tượng của tự do, đam mê tốc độ và khát khao chinh phục mọi cung đường. Từ những mẫu xe đầu tiên còn thô sơ, ngành công nghiệp mô tô đã phát triển mạnh mẽ và đa dạng hoá dòng sản phẩm để phục vụ nhu cầu di chuyển, giải trí và thể thao.</p>
                <p>Ngày nay, mô tô không chỉ là phương tiện giao thông mà còn là phong cách sống, là cộng đồng những người đam mê khám phá. Các hãng xe không ngừng nâng cấp công nghệ, cải tiến thiết kế và nâng cao độ an toàn cho người lái.</p>
                <p>Ngành xe mô tô đang hướng đến tương lai xanh hơn, bền vững hơn với các mẫu xe điện và giải pháp giảm thiểu khí thải.</p>
                <p><a href="#" style={{ textDecoration: 'underline' }}>Tìm hiểu thêm về sự phát triển của mô tô</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-caption">
        <div className="container-medium">
          <h2 className="cs-caption__heading">
            <span>“</span>
            Mô tô không chỉ là phương tiện, đó là một cách sống.
            <br />
            Sống đam mê, sống tự do và chạm tới từng nhịp tim trên mỗi hành trình.
            <span>“</span>
          </h2>
          <span className="cs-caption__author">Một biker chân chính</span>
        </div>
      </section>

      <section className="cs-story">
        <div className="container-medium">
          <div className="grid grid--mobile-rev">
            <div className="grid__column five-twelfths">
              <div className="cs-story__image">
                <img src="../Images/hondabanner3.jpg" alt="Đội ngũ hỗ trợ khách hàng" />
                <span className="cs-services__alt">Đội ngũ hỗ trợ khách hàng</span>
              </div>
            </div>
            <div className="grid__column seven-twelfths">
              <div className="cs-story__content">
                <div className="cs-story__heading">
                  Dịch vụ khách hàng trong ngành xe mô tô
                </div>
                <div className="ca-story__description">
                  <p>Khách hàng ngày càng quan tâm đến trải nghiệm sau bán hàng. Các thương hiệu xe mô tô hiện nay tập trung nhiều vào dịch vụ bảo dưỡng, hậu mãi, hỗ trợ kỹ thuật tận tâm và nhanh chóng.</p>
                  <p>Không chỉ có dịch vụ sửa chữa, nhiều hãng xe còn tổ chức cộng đồng biker, các tour phượt và các chương trình huấn luyện kỹ năng lái xe an toàn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-services">
        <div className="container-medium">
          <h2 className="cs-services__heading">
            Hướng tới mô hình doanh nghiệp xe mô tô có trách nhiệm
          </h2>

          <div id="services1" className="grid grid--aligned-center">
            <div className="grid__column">
              <h3 className="cs-services__title">#1. Với khách hàng</h3>
              <div className="cs-services__description">
                <p>Chúng tôi mong muốn mang đến những chiếc xe chất lượng, an toàn và trải nghiệm lái tuyệt vời. Hệ thống phân phối chính hãng, dịch vụ bảo hành linh hoạt và hỗ trợ tận tình là ưu tiên hàng đầu.</p>
              </div>
            </div>
            <div className="grid__column">
              <div className="cs-services__image">
                <img src="../Images/sevices1.png" alt="Ảnh tại showroom mô tô" />
                <span className="cs-services__alt">Ảnh tại showroom mô tô</span>
              </div>
            </div>
          </div>

          <div id="services2" className="grid grid--aligned-center">
            <div className="grid__column">
              <h3 className="cs-services__title">#2. Với nhân viên</h3>
              <div className="cs-services__description">
                <p>Chúng tôi xây dựng môi trường làm việc chuyên nghiệp, năng động, trao quyền cho đội ngũ kỹ thuật và nhân viên kinh doanh phát triển nghề nghiệp và đam mê.</p>
              </div>
            </div>
            <div className="grid__column">
              <div className="cs-services__image">
                <img src="../Images/sevices2.png" alt="Ảnh đội ngũ nhân viên tại sự kiện mô tô" />
                <span className="cs-services__alt">Ảnh đội ngũ nhân viên tại sự kiện mô tô</span>
              </div>
            </div>
          </div>

          <div id="services3" className="grid grid--aligned-center">
            <div className="grid__column">
              <h3 className="cs-services__title">#3. Với đối tác</h3>
              <div className="cs-services__description">
                <p>Chúng tôi hợp tác chặt chẽ với các nhà cung cấp linh kiện, đại lý phân phối và các tổ chức đào tạo lái xe để cùng xây dựng một hệ sinh thái mô tô vững mạnh và phát triển bền vững.</p>
              </div>
            </div>
            <div className="grid__column">
              <div className="cs-services__image">
                <img src="../Images/hondabanner4.jpg" alt="Ảnh tại xưởng lắp ráp xe mô tô" />
                <span className="cs-services__alt">Ảnh tại xưởng lắp ráp xe mô tô</span>
              </div>
            </div>
          </div>

          <div id="services4" className="grid grid--aligned-center">
            <div className="grid__column">
              <h3 className="cs-services__title">#4. Với môi trường</h3>
              <div className="cs-services__description">
                <p>Ngành mô tô đang từng bước chuyển đổi sang công nghệ xanh, giảm thiểu khí thải và hướng tới xe điện. Đây là nỗ lực chung nhằm bảo vệ môi trường và phát triển bền vững.</p>
              </div>
            </div>
            <div className="grid__column">
              <div className="cs-services__image">
                <img src="../Images/services4.png" alt="Xe điện mô tô đang thử nghiệm" />
                <span className="cs-services__alt">Xe điện mô tô đang thử nghiệm</span>
              </div>
            </div>
          </div>

          <div id="services5" className="grid grid--aligned-center">
            <div className="grid__column">
              <h3 className="cs-services__title">#5. Với cộng đồng</h3>
              <div className="cs-services__description">
                <p>Chúng tôi kết nối cộng đồng biker thông qua các hành trình thiện nguyện, bảo vệ an toàn giao thông, gây quỹ giúp đỡ người nghèo và hỗ trợ những hoàn cảnh khó khăn khắp cả nước.</p>
              </div>
            </div>
            <div className="grid__column">
              <div className="cs-services__image">
                <img src="../Images/services5.png" alt="Chương trình thiện nguyện từ cộng đồng biker" />
                <span className="cs-services__alt">Chương trình thiện nguyện từ cộng đồng biker</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
