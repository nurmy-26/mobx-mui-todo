export const getFormattedDate = (
  dateString: Date | string,
  type: "narrow" | "short" | "medium" | "long" = "long"
) => {
  let date = dateString;
  if (!(date instanceof Date)) {
    date = new Date(dateString);
  }

  if (type === "narrow") {
    // если нужен короткий формат
    const localeDateString = date.toLocaleDateString("ru-RU", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    });

    // возвращаем дату в итоговом формате "день недели, ЧЧ:ММ"
    return localeDateString.split(" ").join(", ");
  } else if (type === "short") {
    // формат "День недели, ЧЧ:ММ, ДД.ММ День недели"
    const localeDateString = date.toLocaleDateString("ru-RU", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const dateArr = localeDateString.split(", ");
    const weekday = dateArr[0].charAt(0).toUpperCase() + dateArr[0].slice(1);
    const day = dateArr[1];
    const time = dateArr[2];

    // возвращаем дату в итоговом формате "ЧЧ:ММ, ДД.ММ День недели"
    return `${time}, ${day} ${weekday}`;
  } else if (type === "medium") {
    // формат "День недели, ЧЧ:ММ, ДД.ММ День недели"
    const localeDateString = date.toLocaleDateString("ru-RU", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const dateArr = localeDateString.split(", ");
    const weekday = dateArr[0].charAt(0).toUpperCase() + dateArr[0].slice(1);
    const day = dateArr[1];
    const time = dateArr[2];

    // возвращаем дату в итоговом формате "ЧЧ:ММ, День недели (ДД.ММ)"
    return `${time}, ${weekday} (${day})`;
  } else {
    // преобразование даты в локальный формат "ДД.ММ.ГГГГ, ЧЧ:ММ:СС"
    const localeDateString = date.toLocaleDateString("ru-RU", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    // получение смещения временного пояса
    const timezoneOffsetMinutes = date.getTimezoneOffset();
    const timezoneOffsetHours = -timezoneOffsetMinutes / 60;

    // форматирование смещения так, чтобы оно выглядело как +3 или -3
    const formattedTimezoneOffset = `UTC${
      timezoneOffsetHours >= 0 ? "+" : ""
    }${timezoneOffsetHours}`;

    // возвращаем дату в итоговом формате "ДД.ММ.ГГГГ, ЧЧ:ММ:СС UTC"
    return `${localeDateString} ${formattedTimezoneOffset}`;
  }
};
