import { render, screen } from "@testing-library/react";
import Toppings from ".";

import userEvent from "@testing-library/user-event";
test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();
  //1)bileşeni renderla
  render(<Toppings />);

  //2)toplam spanı al
  const total = screen.getByTestId("total");

  //3) tüm sosları al
  const cards = await screen.findAllByTestId("card");

  // 4) başlangıç anında toplam sıfır mı kontrol et
  expect(total).toHaveTextContent(/^0$/);
  
  // 5) bir sosa tıkla
  await user.click(cards[3]);

  //6) toplam ücret 3 oldu mu
  expect(total).toHaveTextContent(/^3$/);

  // 7) farklı bir sosa tıkla
  await user.click(cards[4])

  // 8) toplam 6 oldu mu kontrol et
  expect(total).toHaveTextContent(/^6$/);


  //9) tıklanan soslardan birine tekrar tıkla
  await user.click(cards[4])


  // 10)toplam 3 oldu mu kontrol et
  expect(total).toHaveTextContent(/^3$/);


  //11) tıklanan soslardan diğerine tekrar tıkla
  await user.click(cards[3])

  //12) toplam 0 oldu mu kontrol  et
  expect(total).toHaveTextContent(/^0$/);

});

test("soslar sepete eklendiğinde aktif class'ı alır",async()=>{
    //userEvent'in krulumunu yaptık
    const user =userEvent.setup();
    //bileşen renderlanır
    render(<Toppings/>)
    //cardları çağırdık
    const cards= await screen.findAllByTestId("card")

    //1)bütün kartların aktif klasına sahip olmadığından emin ol
    cards.forEach((card)=>expect(card).not.toHaveClass("active"))
    //2)m&m kartına tıkla
    await user.click(cards[0])
 
    //3)m&m kartı aktive class'ına sahip mi?
    expect(cards[0]).toHaveClass("active")

    //4) m&M kartına tekrar tıkla

    await user.click(cards[0])


    //5 m&m kartı active class'ına sahip değil mi?
    expect(cards[0]).not.toHaveClass("active")



 






})
