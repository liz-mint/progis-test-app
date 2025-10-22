const PointInfo = ({ data, error }) => {
  if (error) {
    return (
      <p>Ошибка получения данных</p>
    )
  }

  return (
    <ul className={'point-info'}>
      {data.map((item, index) => (
        <li key={index}>{item.name}: {item.value || '﹣'}</li>
      ))}
    </ul>
  )
}

export default PointInfo;