class Storage {
  getFromStorage() {
      const favorites = localStorage.getItem('favorite');
      if (favorites) {
          try {
              return JSON.parse(favorites); // Veriyi ayrıştır
          } catch (error) {
              console.error("JSON ayrıştırma hatası:", error);
              return []; // Hata varsa boş dizi döndür
          }
      }
      return []; // Eğer veri yoksa boş dizi döndür
  }
}
