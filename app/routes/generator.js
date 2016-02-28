exports.generateImage = function () {
  var images = 
  ["https://cloud.githubusercontent.com/assets/5565596/13378413/c0cb47ca-ddba-11e5-84c4-945994c4dea4.jpg",
  "https://cloud.githubusercontent.com/assets/5565596/13378414/c0f3619c-ddba-11e5-9a6f-d3923ef1fa77.jpg",
  "https://cloud.githubusercontent.com/assets/5565596/13378415/c102f198-ddba-11e5-86b8-f37265c51303.jpg",
  "https://cloud.githubusercontent.com/assets/5565596/13378416/c1117bdc-ddba-11e5-879a-b33c76dffe1c.jpg",
  "https://cloud.githubusercontent.com/assets/5565596/13378417/c1190a78-ddba-11e5-8711-ad907f4408f8.jpg",
  "https://cloud.githubusercontent.com/assets/5565596/13378418/c11a4316-ddba-11e5-9c03-ea0935261f90.jpg"];

  return images[Math.floor(Math.random()*images.length)];
};

// Hardcoded function to generate college names
exports.getCollegeName = function(shortname){
  if(shortname == 'ucsd'){
    return 'UC San Diego';
  }else if(shortname == 'stanford'){
    return 'Stanford';
  }else if(shortname == 'harvard'){
    return 'Harvard'
  }
  return 'UC San Diego';
};