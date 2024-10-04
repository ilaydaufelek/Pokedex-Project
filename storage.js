class Storage {
  getFromStorage() {
      const favorites = localStorage.getItem('favorite');
      if (favorites) {
          try {
              return JSON.parse(favorites); 
          } catch (error) {
              console.error("JSON ayrıştırma hatası:", error);
              return []; 
          }
      }
      return []; 
  }
}
