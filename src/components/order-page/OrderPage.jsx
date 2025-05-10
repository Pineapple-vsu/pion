import { Link } from "react-router-dom";
import { ButtonDark } from "../buttons";
import styles from "./order-page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "../form/Form";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
// Обнуляем время (если нужно сравнивать только дату)
tomorrow.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  personName: yup.string().required("Введите имя"),
  personPhone: yup
    .string()
    .matches(
      /^\+375\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
      "Некорректный номер телефона"
    )
    .required("Введите номер телефона"),
  deliveryDate: yup
    .date()
    .typeError("Выберите дату доставки")
    // Минимальная дата обязана быть не раньше завтрашнего дня
    .min(tomorrow, "Дата должна быть не раньше завтрашнего дня")
    .required("Выберите дату доставки"),
  deliveryTime: yup.string().required("Выберите время доставки"),
  addressType: yup.string().required("Выберите способ получения"),
  personAddress: yup.string().required("Введите адрес"),
  agree: yup.boolean().oneOf([true], "Необходимо согласие"),
});
export const OrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Форма отправлена", data);
    alert("Заказ успешно оформлен!");
    // Здесь можно отправить данные на сервер (например, fetch или axios).
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form className={styles.form}>
        <div className={styles.content}>
          <div className={styles.form_header}>
            <h2>Оформление заказа</h2>
          </div>
          <div className={styles.row}>
            <label htmlFor="personName" className={styles.labelText}>
              Ваше имя
            </label>
            <input
              type="text"
              {...register("personName")}
              placeholder="Имя"
              className={errors.personName ? styles.inputError : ""}
            />
            {errors.personName && (
              <p className={styles.error}>{errors.personName.message}</p>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="personPhone" className={styles.labelText}>
              Номер телефона
            </label>
            <input
              type="tel"
              {...register("personPhone")}
              placeholder="+375 (29) 000-00-00"
              className={errors.personPhone ? styles.inputError : ""}
            />
            {errors.personPhone && (
              <p className={styles.error}>{errors.personPhone.message}</p>
            )}
          </div>
          <div className={styles.row}>
            <label className={styles.labelText}>
              Время, к которому нужно доставить букет*
            </label>
            <div className={styles.datetime}>
              <input
                type="date"
                {...register("deliveryDate")}
                className={errors.deliveryDate ? styles.inputError : ""}
              />
              <input
                type="time"
                {...register("deliveryTime")}
                className={errors.deliveryTime ? styles.inputError : ""}
              />
            </div>
            {errors.deliveryDate && (
              <p className={styles.error}>{errors.deliveryDate.message}</p>
            )}
            {errors.deliveryTime && (
              <p className={styles.error}>{errors.deliveryTime.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <label className={styles.labelText}>Способ получения</label>
            <div className={styles.address}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="delivery"
                  value="delivery"
                  {...register("addressType")}
                />
                <label htmlFor="delivery" className={styles.labelText}>
                  доставка
                </label>
              </div>
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="pickup"
                  value="pickup"
                  {...register("addressType")}
                />
                <label htmlFor="pickup" className={styles.labelText}>
                  самовывоз
                </label>
              </div>
            </div>
            {errors.addressType && (
              <p className={styles.error}>{errors.addressType.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <label htmlFor="personAddress" className={styles.labelText}>
              Адрес
            </label>
            <input
              type="text"
              {...register("personAddress")}
              placeholder="Адрес"
              className={errors.personAddress ? styles.inputError : ""}
            />
            {errors.personAddress && (
              <p className={styles.error}>{errors.personAddress.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <input
              type="checkbox"
              {...register("agree")}
              id="agree"
              className={styles.check}
            />
            <label htmlFor="agree" className={styles.labelText}>
              Я согласен на обработку&nbsp;
              <Link to="/personal">персональных данных</Link>
            </label>
            {errors.agree && (
              <p className={styles.error}>{errors.agree.message}</p>
            )}
          </div>
          <span>*букет будет доставлен в течение часа</span>
          <div>
            <button type="submit">
              <ButtonDark>Отправить</ButtonDark>
            </button>
          </div>
        </div>
      </Form>
    </form>
  );
};
