import React, {createContext, useContext, useState} from 'react';

//функция createContext (возвращает Provider, Consumer) позволяет пробрасывать данные через несклько слоев компонентов
//объявление контекста 
const DataContext = createContext();

//объявление провайдера
//принимает детей для того, чтобы мы могли в него что-то оборачивать, а он уже обернутое, в виде детей отрендерит
export const DataProvider = ({children}) => {
    //создаем объект для хранения данных
    const [data, setData] = useState({})

    // создаем функцию для записи данных в объект (принимает новые значения)
    const setValues = (values) => {
        //вызываем сеттер объекта (получает пред. данные),
        //возвращает объект с пред. данными + с перезаписанными полями, которые будут переданы в новых данных
        setData(prevData => ({
            ...prevData,
            ...values
        }))
    }
    //возвращаем провайдер внутри которого рендерятся дети
    //передаем в качестве поля value данные
    return (
        <DataContext.Provider value={{data, setValues}}>
             {children}
        </DataContext.Provider>
    ); 
};
//реализация кастомного хука
export const useData = () => useContext(DataContext)