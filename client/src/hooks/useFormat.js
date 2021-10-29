
function useFormat() {
  const formatDate = (data) => {
    const newDate = new Date(data);
    const date = newDate.toISOString().split("T");
    const hourArr = date[1].split(".")[0].split(":");
    const hour = `${hourArr[0]}:${hourArr[1]}`;

    const format = `${hour} ${date[0]}`;

    return format;
  };
  return formatDate
}

export default useFormat
