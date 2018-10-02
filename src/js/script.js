window.addEventListener('load', () => {
  const pageName = document.querySelector('body').getAttribute('id');

  const modulesList = {
    home: require('./pages/home'),
  };

  modulesList[pageName].render();
});
