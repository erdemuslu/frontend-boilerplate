window.addEventListener('load', () => {
  const pageName = document.querySelector('body').getAttribute('id');

  const modulesList = {
    home: require('./helper/home'),
  };

  modulesList[pageName].init();
});
