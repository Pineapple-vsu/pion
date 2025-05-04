// import { ButtonLight } from "../buttons/button-light/ButtonLight";
// import styles from "./banner.module.css";
import { Link } from "react-router";
import { Banner, Sails, Info, About, Contacts, Weekly } from "./components";
import { Form } from "../form/Form";

export const MainPage = () => {
  return (
    <>
      <Banner></Banner>
      <Info></Info>
      <Sails></Sails>
      <About></About>
      <Contacts></Contacts>
      <Weekly></Weekly>
      <Form></Form>
    </>
  );
};
