// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

let load_map;
export {load_map}

window.addEventListener('load', () => {
  var Options = {
    zoom: 13.5,      //地図の縮尺値
    mapTypeId: 'roadmap'   //地図の種類
  };
  load_map = new google.maps.Map(document.getElementById('map'), Options);
})

require("@rails/ujs").start();
// require("turbolinks").start();
require("@rails/activestorage").start();
require("../channels");
require("get_position");
require("home");
require("post_message");
require("search");
require("position");
require("mail");
require("favorite");
require("comments");
require("calc_range");
require("build_html");
require("click_marker");
require("click_messages");
require("get_messages");
require("test");



// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
