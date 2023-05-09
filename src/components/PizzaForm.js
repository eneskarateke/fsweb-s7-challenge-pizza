import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from 'react-router-dom';
import Header from "../layouts/Header";
import "./PizzaForm.css";

const PizzaForm = () => {
  const [pizza, setPizza] = useState({
    name: "Kendi Pizzanı Kendin Yarat",
    description: "Mozarella ve domates sos",
    price: 70
  });
  

const [formData, setFormData] = useState({
name: "",
size: "",
thickness:"",
toppings: [],
special: "",
});
const [nameError, setNameError] = useState("");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  if (e.target.name === "name" && e.target.value.length < 2) {
    setNameError("İsim en az 2 karakter olmalıdır");
  } else {
    setNameError("");
  }
};

const handleToppingsChange = (e) => {
const toppings = [...formData.toppings];
if (e.target.checked) {
toppings.push(e.target.name);
} else {
const index = toppings.indexOf(e.target.name);
if (index > -1) {
toppings.splice(index, 1);
}
}
setFormData({
...formData,
toppings,
});
};

const history = useHistory();

const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.name.length < 2) {
    setNameError("İsim en az 2 karakter olmalıdır");
    return;
  } else {
    setNameError("");
  }
  const toppingPrice = formData.toppings.length * 5;
  const total = pizza.price + toppingPrice;
  setPizza({
    ...pizza,
    price: total,
  });
  axios
    .post("https://64591bd94eb3f674df86eb01.mockapi.io/orders", formData)
    .then((response) => {
      console.log(response.data);
      history.push('/success'); 
    })
    .catch((error) => {
      console.log(error);
    });
};


return (

    <>
      <Header />
      <div className="formContainer">
        <div className="formContainerInner">
        { 
        <div className="tabanPizza">
        <h1>{pizza.name}</h1>
        <h3 className="bold">{pizza.price}₺</h3>
        <h3 className="kucukFont">İçindekiler: {pizza.description}</h3>
        <h3 className="kucukFont">Aşağıdan eklemek istediğiniz malzemeleri seçebilirsiniz.</h3>

      </div>
       }
      
        
      <Form id="pizza-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name-input">İsim:</Label>
          <Input
            type="text"
            id="name-input"
            name="name"
            placeholder="İsminizi giriniz!"
            value={formData.name}
            onChange={handleChange}
          />
          {nameError && <span className="error">{nameError}</span>}
        </FormGroup>
        <div className="dropdowns">
        <FormGroup>
          <Label for="size-dropdown">Boyut Seç:</Label>
          <Input
            type="select"
            id="size-dropdown"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="small">Küçük</option>
            <option value="medium">Orta</option>
            <option value="large">Büyük</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="thickness-dropdown">Hamur Kalınlığı Seç:</Label>
          <Input
            type="select"
            id="thickness-dropdown"
            name="thickness"
            value={formData.thickness}
            onChange={handleChange}
          >
            <option value="thin">İnce</option>
            <option value="medium">Orta</option>
            <option value="thick">Kalın</option>
          </Input>
        </FormGroup>
        </div>
        
        <FormGroup>
          <Label className="bold" for="toppings">Ek Malzemeler:</Label>
          <h4 className="kucukFont"> Seçtiğiniz her malzeme ekstra 5₺ ücrete tabiidir.</h4>
          <div id="toppings">
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="peppers"
                  checked={formData.toppings.includes("peppers")}
                  onChange={handleToppingsChange}
                />
                Biber
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="pepperoni"
                  checked={formData.toppings.includes("pepperoni")}
                  onChange={handleToppingsChange}
                />
                Pepperoni
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="sausage"
                  checked={formData.toppings.includes("sausage")}
                  onChange={handleToppingsChange}
                />
                Sosis
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="bacon"
                  checked={formData.toppings.includes("bacon")}
                  onChange={handleToppingsChange}
                />
                Dumanlı Sığır Pastırması
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="ham"
                  checked={formData.toppings.includes("ham")}
                  onChange={handleToppingsChange}
                />
                Jambon
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="anchovies"
                  checked={formData.toppings.includes("anchovies")}
                  onChange={handleToppingsChange}
                />
                Hamsi
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="chicken"
                  checked={formData.toppings.includes("chicken")}
                  onChange={handleToppingsChange}
                />
                Tavuk
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="mushrooms"
                  checked={formData.toppings.includes("mushrooms")}
                  onChange={handleToppingsChange}
                />
                Mantar
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="onions"
                  checked={formData.toppings.includes("onions")}
                  onChange={handleToppingsChange}
                />
                Soğan
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  name="olives"
                  checked={formData.toppings.includes("olives")}
                  onChange={handleToppingsChange}
                />
                Zeytin
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="special-text">Sipariş Notu:</Label>
          <Input
            type="text"
            id="special-text"
            name="special"
            placeholder="Eklemek istediğiniz not var mı?"
            value={formData.special}
            onChange={handleChange}
          />
        </FormGroup>
        
      </Form>
      <div className="siparisOzet">
      <h3>Sipariş Toplamı</h3>
        <h4>Seçimler   {formData.toppings.length * 5}₺
        </h4>
        <h4 className="red">Toplam {pizza.price + formData.toppings.length * 5}₺ </h4>
        <Button type="submit" id="order-button">
          Sipariş Ver
        </Button>
      </div>
        </div>
        
      
      </div>
    </>
  );

  }
  export default PizzaForm;