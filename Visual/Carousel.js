import React from "react";

const Carousel = () => {
  return (
    <div id="carruselPrincipal" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://scontent.fatf2-1.fna.fbcdn.net/v/t39.30808-6/469156476_565831879481463_6377870655521753181_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGg5Pnno8btEK_RWO2dhfNnG9hOC6WEsQQb2E4LpYSxBH6UJStxoNFb8CwtCbtEJEs-DCebA-m_uFyJOoZ9ELLF&_nc_ohc=PpNQUYWTO04Q7kNvgFCDz_1&_nc_oc=AdhM3sRvNA3YJHoPMoG8UywoElOw0MvlAgJErI9yc3olZWKjcJZ-1Xs9v60hlgsWKQL2wMq_OGVPONFAhjgHZpPr&_nc_zt=23&_nc_ht=scontent.fatf2-1.fna&_nc_gid=AQzrO-bCEhE8HhKP-VnV8kv&oh=00_AYCTXqEmkoRQk2ITBasxB5iaD6QVLrVV3q3_PAHg-qHuwA&oe=67B1D9D9"
          className="d-block w-100" alt="Imagen 1" />
        </div>
        <div className="carousel-item">
          <img src="https://scontent.fatf2-1.fna.fbcdn.net/v/t1.6435-9/210419248_1402319493480778_5193377454764941928_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFUMBUFa45WF7beauINvYv-y3beqMF5LH7Ldt6owXksay_SrBzCM_UHxNTkUQtPjbKJipDaAQIEVvbdFAMDW4K&_nc_ohc=7l86mPktf7kQ7kNvgEOLuag&_nc_oc=AdjyZJbiLcS-_BUP5KTHi9w2GCHllCwA6O-CBYZpCUF78oQZAnsJarvrpJO2GdVENhWLqALmlfl3Tj5HD89OzMM6&_nc_zt=23&_nc_ht=scontent.fatf2-1.fna&_nc_gid=A1Bm47gGLsfYl_8xhT4BoIW&oh=00_AYDmUZ4IsQyU_9J7CTC5E7QpgbfH0iKACnZBGhglA_ZEzA&oe=67D394F3" 
          className="d-block w-100" alt="Imagen 2" />
        </div>
        <div className="carousel-item">
          <img src="https://scontent.fatf2-1.fna.fbcdn.net/v/t39.30808-6/462005095_2218143791898340_568664853902792592_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHxnqRri5HA6w9rWliZ3gGd7xY9pwyPO0PvFj2nDI87QznanJPOTjuFrgyITtHaivA4GYrd6ZD1fULNSTDRjJGG&_nc_ohc=_4eoyBUCGhIQ7kNvgERQLa5&_nc_oc=AdgkYMISysfKMKXDHI1c8IRaQvQC5lnKbwllf7eU1KSnkDA4qx4WvV6ckV3GYj1Us6OOAvGp9Y6au-YM7IKZrKg9&_nc_zt=23&_nc_ht=scontent.fatf2-1.fna&_nc_gid=Ah7DSA8V9mLBFGmyq65kF_N&oh=00_AYCYpEmiq5zhGRtXOQttJO5rP2u8rPTZfWDm4nDBbqQDlQ&oe=67B1F133" 
          className="d-block w-100" alt="Imagen 3" />
        </div>
        
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carruselPrincipal" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
