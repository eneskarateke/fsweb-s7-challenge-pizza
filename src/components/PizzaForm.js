import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import Header from "../layouts/Header";

import "./PizzaForm.css";

const PizzaForm = () => {
  const [isFormValid, setFormValid] = useState(false);
  const pizza = {
    name: "Kendi Pizzanı Kendin Yarat",
    description: "Mozarella ve domates sos",
    price: 70,
  };
  const [sizePrice, setSizePrice] = useState(0);

  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    thickness: "",
    toppings: [],
    special: "",
  });
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Lütfen isminizi girin.")
      .min(2, "İsim en az 2 karakter olmalıdır"),
    size: Yup.string(),
    thickness: Yup.string(),
    toppings: Yup.array()
      .required("Lütfen malzeme seçimi girin.")
      .min(4, "En az 4 seçim olmalıdır"),
    special: Yup.string(),
  });
  const [sonuc, setSonuc] = useState();
  const [formErrors, setFormErrors] = useState({
    name: "",
    size: "",
    thickness: "",
    toppings: "",
    special: "",
  });

  useEffect(() => {
    if (formData.size === "medium") {
      setSizePrice(20);
    } else if (formData.size === "large") {
      setSizePrice(30);
    } else if (formData.size === "small") {
      setSizePrice(0);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [e.target.name]: err.errors[0] });
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formData)
      .then((response) => {
        console.log(response);
        setSonuc(response.data);
        setTimeout(() => {
          history.push("/success");
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(sonuc);
  }, [formData]);
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      if (!formErrors.name) {
        setFormValid(valid);
      } else {
        setFormValid(false);
      }
    });
  }, [formData, formSchema, formErrors]);

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
              <h3 className="kucukFont">
                Aşağıdan eklemek istediğiniz malzemeleri seçebilirsiniz.
              </h3>
              <h3 className="kucukFont">
                <span style={{ color: "red" }}>Dikkat:</span>{" "}
                <span style={{ color: "red" }}>*</span> bulunan alanlar
                zorunludur.
              </h3>
            </div>
          }

          <Form id="pizza-form" onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name-input">
                İsim: <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                id="name-input"
                name="name"
                placeholder="İsminizi giriniz!"
                value={formData.name}
                onChange={handleChange}
                invalid={!!formErrors.name}
              />
              {formErrors.name && (
                <FormFeedback> {formErrors.name} </FormFeedback>
              )}
            </FormGroup>
            <div className="dropdowns">
              <FormGroup>
                <Label for="size-radio">
                  Boyut Seç: <span style={{ color: "red" }}>*</span>
                </Label>
                <div>
                  <Label check>
                    <Input
                      type="radio"
                      id="size-small"
                      name="size"
                      value="small"
                      checked={formData.size === "small"}
                      onChange={handleChange}
                    />
                    Küçük
                  </Label>
                </div>
                <div>
                  <Label check>
                    <Input
                      type="radio"
                      id="size-medium"
                      name="size"
                      value="medium"
                      checked={formData.size === "medium"}
                      onChange={handleChange}
                    />
                    Orta +20₺ ekstra farkla.
                  </Label>
                </div>
                <div>
                  <Label check>
                    <Input
                      type="radio"
                      id="size-large"
                      name="size"
                      value="large"
                      checked={formData.size === "large"}
                      onChange={handleChange}
                    />
                    Büyük +30₺ ekstra farkla.
                  </Label>
                </div>
              </FormGroup>

              <FormGroup className="dropdown">
                <Label for="thickness-dropdown">
                  Hamur Seç: <span style={{ color: "red" }}>*</span>
                </Label>
                <h4 className="kucukFont">
                  Dilediğiniz kalınlığı fiyat farkı olmadan seçebilirsiniz.
                </h4>
                <Input
                  type="select"
                  id="thickness-dropdown"
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleChange}
                >
                  <option value="Hamur">Hamur Kalınlığı</option>
                  <option value="thin">İnce</option>
                  <option value="medium">Orta</option>
                  <option value="thick">Kalın</option>
                </Input>
              </FormGroup>
            </div>

            <FormGroup>
              <Label className="bold" for="toppings">
                Ek Malzemeler: <span style={{ color: "red" }}>*</span>
              </Label>
              <h4 className="kucukFont">
                Seçtiğiniz her malzeme ekstra 5₺ ücrete tabiidir.{" "}
                <span style={{ color: "red" }}>
                  En az 4 adet seçim yapmalısınız.
                </span>
              </h4>
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
                    Bacon
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
            <div className="siparisOzet">
              <h3>Sipariş Toplamı</h3>
              <h4 className="kucukFont">
                Ek malzeme seçimleri: {formData.toppings.length * 5}₺
              </h4>
              <h4 className="kucukFont">Boyut seçimi: {sizePrice}₺</h4>
              <h4 className="red">
                Toplam {pizza.price + formData.toppings.length * 5 + sizePrice}₺
              </h4>
              <Button
                color="warning"
                type="submit"
                id="order-button"
                disabled={!isFormValid}
              >
                Sipariş Ver
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default PizzaForm;
