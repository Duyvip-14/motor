import React, { Fragment } from 'react'

import { StartSlider } from '../../until/slideshow';

export default function Silde() {
 StartSlider();

  return (
    <Fragment>
       <section class="homepage-banner">
            <section>
                <div class="banner-slide"> 
                    <img  class="slide-img" src="../Images/Motor1.jpg" alt="slide" />
                    <img  class="slide-img" src="../Images/Motor2.jpg" alt="slide"/>
                    <img  class="slide-img" src="../Images/Motor3.jpg" alt="slide"/>
                    <img  class="slide-img" src="../Images/Motor4.jpg" alt="slide"/>
                    <img  class="slide-img" src="../Images/Motor5.jpg" alt="slide"/>
                    <img  class="slide-img" src="../Images/Motor6.jpg" alt="slide"/>
                </div>
            </section>
        </section>
    </Fragment>
  )
}

