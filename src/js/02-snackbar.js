import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delaynum = document.querySelector("input[name='delay']");
delaynum.classList.add('numDelay');
document.querySelector("button[type='submit']").addEventListener("click", function (event) {
  event.preventDefault(); // Забороняємо перезавантаження сторінки після натискання кнопки

  const delay = document.querySelector("input[name='delay']").value; // Отримуємо значення затримки із поля вводу
  
  const state = document.querySelector("input[name='state']:checked").value; // Отримуємо обрану опцію в радіокнопках

  // Створюємо новий проміс із зазначеною затримкою
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробляємо проміс
  promise.then((value) => {
    iziToast.success({
      title: "✅ Fulfilled promise",
      message: `Fulfilled promise in ${value}ms`,
    });
    console.log("✅ Fulfilled promise in ${delay}ms");
    clearForm(); // Очищаємо форму
  }).catch((value) => {
    iziToast.error({
      title: "❌ Rejected promise",
      message: `Rejected promise in ${value}ms`,
    });
    console.log(`❌ Rejected promise in ${delay}ms`);
    clearForm(); // Очищаємо форму
  });
});

// Функція для очищення форми
function clearForm() {
  document.querySelector("input[name='delay']").value = ""; // Очищаємо поле вводу затримки
  document.querySelector("input[name='state']:checked").checked = false; // Знімаємо вибір опції радіокнопок
}