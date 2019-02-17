export default ({
    name,
    topCategories,
    ratingScore,
    logo,
    deliveryTimeMaxMinutes,
    link,
}) => {
    const content = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    `<h1 id="firstHeading" class="firstHeading">${name}</h1>`+
    '<div id="bodyContent">'+
    `<p>Top categories: ${topCategories}</p>`+
    `<p>Rating: ${ratingScore}</p>`+
    `<p>Max delivery time: ${deliveryTimeMaxMinutes}mins</p>`+
    //`<img src="​https://d1v73nxuzaqxgd.cloudfront.net/restaurants/${logo}" alt="Restaurant logo"/>`+
    `<a href="http://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu">Profile link</a>`+
    '</div>'+
    '</div>';
    return new google.maps.InfoWindow({ content });
};