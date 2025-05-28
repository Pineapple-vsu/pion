import { Link } from "react-router-dom";
import { ButtonDark } from "../buttons";
import styles from "./main-page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "../form/Form";
import { Banner, Sails, Info, About, Contacts, Weekly } from "./components";
import { useState } from "react";

const schema = yup
  .object({
    personName: yup.string().required("Введите имя"),
    personMail: yup
      .string()
      .email("Некорректный email")
      .required("Введите email"),
    question: yup.string().required("Введите вопрос"),
    agree: yup
      .boolean()
      .oneOf([true], "Необходимо согласие на обработку данных"),
  })
  .required();

export const MainPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    console.log("Форма отправлена", data);

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.personName,
          email: data.personMail,
          question: data.question,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке вопроса");
      }

      const result = await response.json();
      console.log("Вопрос добавлен в базу:", result);
      reset();
      setSubmitted(true);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке вопроса, попробуйте снова.");
    }
  };
  if (submitted) {
    return (
      <>
        <Banner />
        <Info />
        <Sails />
        <About />
        <Contacts />
        <Weekly />
        <Form>
          <div className={styles.container}>
            <div className={styles.image}></div>
            <div className={styles.right}>
              <h2>Вопрос отправлен!</h2>
            </div>
          </div>
        </Form>
      </>
    );
  }
  return (
    <>
      <Banner />
      <Info />
      <Sails />
      <About />
      <Contacts />
      <Weekly />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Form className={styles.form}>
          <div className={styles.content}>
            <div className={styles.form_header}>
              <h2>Есть вопросы?</h2>
              <h3>
                Заполните форму или напишите нам в любую&nbsp;
                <a href="#social" className={styles.text_link}>
                  социальную сеть
                </a>
                &nbsp; и мы ответим в течение 15 минут
              </h3>
            </div>
            <div className={styles.row}>
              <label htmlFor="personName" className={styles.lableText}>
                Введите имя
              </label>
              <input
                type="text"
                id="personName"
                placeholder="Имя"
                {...register("personName")}
                className={errors.personName ? styles.inputError : ""}
              />
              {errors.personName && (
                <p className={styles.error}>{errors.personName.message}</p>
              )}
            </div>
            <div className={styles.row}>
              <label htmlFor="personMail" className={styles.lableText}>
                Введите email
              </label>
              <input
                type="email"
                id="personMail"
                placeholder="Эл. почта"
                {...register("personMail")}
                className={errors.personMail ? styles.inputError : ""}
              />
              {errors.personMail && (
                <p className={styles.error}>{errors.personMail.message}</p>
              )}
            </div>
            <div className={styles.row}>
              <label htmlFor="question" className={styles.lableText}>
                Введите вопрос
              </label>
              <textarea
                id="question"
                placeholder="Вопрос"
                {...register("question")}
                className={errors.question ? styles.inputError : ""}
              />
              {errors.question && (
                <p className={styles.error}>{errors.question.message}</p>
              )}
            </div>
            <div className={styles.row}>
              <input
                type="checkbox"
                id="agree"
                className={styles.check}
                {...register("agree")}
              />
              <label htmlFor="agree" className={styles.lableText}>
                Я согласен на обработку&nbsp;
                <Link to="/personal">персональных данных</Link>
              </label>
              {errors.agree && (
                <p className={styles.error}>{errors.agree.message}</p>
              )}
            </div>
            <div>
              <button type="submit">
                <ButtonDark>Отправить</ButtonDark>
              </button>
            </div>
          </div>
        </Form>
      </form>
    </>
  );
};
