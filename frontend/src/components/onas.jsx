import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>О нас</h2>
        <div style={styles.section}>
          <h3 style={styles.subtitle}>Почему выбирают нас?</h3>
          <p style={styles.paragraph}>
            <strong>Опыт и профессионализм:</strong> Наша команда состоит из высококвалифицированных специалистов с многолетним опытом ремонта различных видов бытовой техники — от стиральных машин до холодильников.
          </p>
          <p style={styles.paragraph}>
            <strong>Быстрый и качественный ремонт:</strong> Мы понимаем, насколько важна бытовая техника в повседневной жизни, поэтому делаем всё возможное, чтобы вернуть её в рабочее состояние как можно быстрее.
          </p>
          <p style={styles.paragraph}>
            <strong>Прозрачность и честность:</strong> Никаких скрытых платежей и неясных условий. Мы честны с нашими клиентами с самого начала и предоставляем подробную информацию о стоимости и времени выполнения ремонта.
          </p>
          <p style={styles.paragraph}>
            <strong>Гарантия на работы:</strong> Мы уверены в качестве своей работы, поэтому предоставляем гарантию на все выполненные ремонты и установленные запчасти.
          </p>
        </div>
        <hr style={styles.separator} />
        <div style={styles.section}>
          <h3 style={styles.subtitle}>Как мы работаем?</h3>
          <p style={styles.paragraph}>
            <strong>Диагностика:</strong> Мы внимательно осматриваем технику, выявляем поломки и обсуждаем с вами возможные решения.
          </p>
          <p style={styles.paragraph}>
            <strong>Ремонт:</strong> Используем только качественные запчасти и проверенные методы ремонта для долгосрочной работы вашей техники.
          </p>
          <p style={styles.paragraph}>
            <strong>Тестирование и сдача:</strong> После завершения ремонта мы тестируем устройство, чтобы убедиться, что оно работает безупречно.
          </p>
        </div>
        <hr style={styles.separator} />
        <p style={styles.contact}>
          Свяжитесь с нами прямо сейчас, и мы оперативно поможем вам решить любую проблему с вашей бытовой техникой!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  content: {
    backgroundColor: "#fff",
    border: "2px solid rgba(128, 128, 128, 0.5)",
    borderRadius: "10px",
    padding: "20px",
    width: "80%",
    maxWidth: "800px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  subtitle: {
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "15px",
    lineHeight: "1.6",
  },
  separator: {
    border: "none",
    borderTop: "1px solid #ddd",
    margin: "30px 0",
  },
  section: {
    marginBottom: "30px",
  },
  contact: {
    fontSize: "16px",
    marginTop: "30px",
    lineHeight: "1.6",
  },
};

export default AboutUs;
