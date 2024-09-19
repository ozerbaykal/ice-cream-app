import { render, screen } from "@testing-library/react";
("@testing-library/react");
import Scoops from "./index";
import userEvent from "@testing-library/user-event";

/*
! Seçiciler
1)Method Tipi | 2) All İfadesi  | 3) Seçici Method

* get > render anında DOM'da olan elementleri almak için kullanılır | get methodu eleamnı bulmazsa hata döndürür
* query > elementin ekranda olma durumunu kesin değilse kullanılır | get ile benzer çalışır elementi bulamazsa null döndürür ve test devam eder
* find > elementi ekrana basılması asenkron olduğu durumlarda kullanılır(api durumlarında)find methodu promise döndürdüğü için async await ile kullanılır

 * eğer seçici methoda All ifadesi eklersek seçici koşula uyan bütün elemanları getirir.
 * not: All kulanılırsa dönen cevapta 1 eleman olsa dahi dizi döner


*/

test("API'dan alınan veriler için ekrana kartlar basılır", async () => {
  

    //bileşeni ekrana bas
  render(<Scoops />);

  //ekrana basılan kartları al(resimleri alma yeterli)
 const images =  await screen.findAllByAltText("çeşit-resim");
 //ekrandaki resimlerin (kartların) sayısı 1 den fazla mı
 expect(images.length).toBeGreaterThanOrEqual(1);
 


 
});

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi",async()=>{
//useEvent'in kurulumunu yap
const user=userEvent.setup();

    //test edilecek bileşen render edilir
    render(<Scoops/>);
 //bütün ekleme ve azaltma butonlarını çağır
 const addBtns = await screen.findAllByRole("button",{name:"Ekle"})
 const delBtns = await screen.findAllByRole("button",{name:"azalt"})
 //toplam fiyat elementini çağır
 const total = screen.getByTestId("total");
 //başlangıç anında toplam 0 mı kontrol et
 expect(total).toHaveTextContent(/^0$/);

 //choclate'ın ekle butonuna tıkla
await user.click(addBtns[2])

 //toplam fiyat 20 mi kontrol et
 expect(total).toHaveTextContent(/^20$/);

 //vanilla'nın ekle butonun çift tıkla
 await user.dblClick(addBtns[1])

 //toplam fiyat 60 mı kontrol et
 expect(total).toHaveTextContent(/^60$/);

 //vanilla'azalt butonuna tıkla
 await user.click(delBtns[1])


 //toplam fiyat 40 mı kontrol et
 expect(total).toHaveTextContent(/^40$/);


 //  vanilla'azalt butonuna tıkla
 await user.click(delBtns[1])



  //toplam fiyat 20 mi kontrol et
  expect(total).toHaveTextContent(/^20$/);


// chocalate 'ın azalt butonuna tıkla
await user.click(delBtns[2])

  //toplam fiyat 0 mi kontrol et

expect(total).toHaveTextContent(/^0$/);





 




})
