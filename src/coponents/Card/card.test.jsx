import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from ".";

//prop olarak gönderelicek item
const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
  id: "f19c",
};

//prop olarak gönderilcek basket

const basket = [
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "f19c",
    amount: 3,
  },
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
    id: "448a",
    amount: 1,
  },
];
//çilolatasız sepet
const otherBasket = [
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
    id: "448a",
    amount: 1,
  },
];
//Prop olarak veri alan bir bileşeni test ediyorsak bileşenin aldığı propları test ortamındada göndermemiz gerekli
test("Miktar,başlık,fotoğraf,gelen propa göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      addToBasket={() => {}}
      removeFromBasket={() => {}}
      basket={basket}
    />
  );

  //miktar spanını çağır
  const amount = screen.getByTestId("amount");

  //span içeriği 3 mi konrol et
  expect(amount).toHaveTextContent(/^3$/);

  //Chocolate yazısı ekrana geldmi diye kontol et
  //getBy elementi bulamazsa hata fırlatır bu yüzden sadece "x" yazı içeriğine sahip element ekranda mı
  //kontrolü yapmak istiyorsak getByText ile elemnti çağırmak yeterlidir.Daha sonra expect kullanmaya gerek yoktur
  //   1.yol
  //   const name=screen.getByText("Chocolate")
  //   expect(name).toBeInTheDocument();
  // 2.yol
  screen.getByText("Chocolate");

  //resim elementini çağır
  const img = screen.getByAltText("çeşit-resim");

  //resim kaynağı doğrumu kontrol et
  expect(img).toHaveAttribute("src", item.imagePath);
});

test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çalışır", async () => {
  const user = userEvent.setup();

  //prop olarak gönderilecek fonksiyonları test edeceksek jest aracılığı (mock) ile test edilebilir
  //fonksiyonalar oluştur.
  const addMockFn = jest.fn();
  const removeMockFn = jest.fn();

  //test edilecek bileşen render edilir
  render(
    <Card
      item={item}
      basket={basket}
      addToBasket={addMockFn}
      removeFromBasket={removeMockFn}
    />
  );

  //butonları al
  const addBtn = screen.getByRole("button", { name: /Ekle/i });
  const delBtn = screen.getByRole("button", { name: /azalt/i });

  //ekle butonuna tıkla
  await user.click(addBtn);
  //addToBasket methodu doğrau parametler ile çalıştı mı ?
  expect(addMockFn).toHaveBeenCalledWith(item);
  //azalt butonuna tıkla
  await user.click(delBtn);

  //removeFromBasket methodu doğru parametreler ile çalıştı mı
  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

//aynı işlevin testlerini bir araya getirmek için kullandığımız testleri kategorize
//etmemizi sağlayan method
describe("azalt butonun aktiflik testleri", () => {
  it("sepette  aynı item' dan varsa buton aktiftir", () => {
    render(<Card item={item} basket={basket} />);

    const button = screen.getByRole("button", { name: "azalt" });

    expect(button).toBeEnabled();
  });

  it("sepette atnı item'dan yoksa buton inaktiftir", () => {
    render(<Card item={item} basket={[otherBasket]} />);
    const button = screen.getByRole("button", { name: "azalt" });

    expect(button).toBeDisabled();
  });
});
