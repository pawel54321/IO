import React//, { Component } 
    from 'react';

import CRUDTable,
{
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm,
    Pagination
} from 'react-crud-table';

import axios from 'axios';

// Component's Base CSS
import '../index.css';

//const DescriptionRenderer = ({ field }) => <textarea {...field} />;

var tasks = [];

const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
    const mapper = x => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === 'id') {
        sorter = data.direction === 'ascending' ?
            SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter = data.direction === 'ascending' ?
            SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
};


const service = {
    fetchItems: (payload) => {
        const { activePage, itemsPerPage } = payload.pagination;
        const start = (activePage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let result = Array.from(tasks);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result.slice(start, end));
    },

    fetchTotal: payload => {
        return Promise.resolve(tasks.length);
    },
    create: (task) => {
        //console.log(task.nazwa);
        task.wycofana = "Nie";
        axios.post('/api/Uzytkownik/PanelAdmina', {
            nazwa: task.nazwa,
            adres: task.adres,
            liczba_miejsc: task.liczba_miejsc,
            godzina_otwarcia: task.godzina_otwarcia,
            godzina_zamkniecia: task.godzina_zamkniecia,
            cena: task.cena,
            nazwamiejscowosc: task.nazwamiejscowosc
        });

        let count = tasks.length + 1;
        tasks.push({
            ...task,
            id: count,
        });
                
        return Promise.resolve(task);
    },
    update: (data) => {
        const task = tasks.find(t => t.id === data.id);

        task.nazwa = data.nazwa;
        task.adres = data.adres;
        task.liczba_miejsc = data.liczba_miejsc;
        task.godzina_otwarcia = data.godzina_otwarcia;
        task.godzina_zamkniecia = data.godzina_zamkniecia;
        task.cena = data.cena;
        task.nazwamiejscowosc = data.nazwamiejscowosc;

        axios.post('/api/Uzytkownik/Panel_Admina4', {
            id: task.id,
            nazwa: task.nazwa,
            adres: task.adres,
            liczba_miejsc: task.liczba_miejsc,
            godzina_otwarcia: task.godzina_otwarcia,
            godzina_zamkniecia: task.godzina_zamkniecia,
            cena: task.cena,
            nazwamiejscowosc: task.nazwamiejscowosc
        });

        return Promise.resolve(task);
    },
    delete: (data) => {
        const task = tasks.find(t => t.id === data.id);
        task.wycofana = "Tak";
        axios.post('/api/Uzytkownik/Wycofanie', {
            idAtrakcja: data.id
        });

        return Promise.resolve(task);
      },

};

const styles = {
    container: {},

};

function Ustaw(props) {
    tasks = props.daneAtrakcja;
    // alert(JSON.stringify((props.daneMiejscowosc)));
}

const TabelaAtrakcja = (props) => (



    <div style={styles.container}>
        {Ustaw(props)}

        <CRUDTable style={{ width: '100%' }}
            caption="Atrakcja"
            actionsLabel="Akcje"
            fetchItems={payload => service.fetchItems(payload)}

        >
            <Fields >
                <Field
                    name="id"
                    label="Id"
                    hideInCreateForm
                    hideInUpdateForm

                />
                <Field
                    name="nazwa"
                    label="Nazwa"
                    placeholder="Nazwa"
                />
                  <Field
                    name="adres"
                    label="Adres"
                    placeholder="Adres"
                   
                />
                <Field 
                    name="liczba_miejsc"
                    label="Liczba miejsc"
                    placeholder="10"
                    
                />
              
                <Field 
                    name="godzina_otwarcia"
                    label="Godz. otwarcia"
                    placeholder="10:50"
                    
                />
                   <Field 
                    name="godzina_zamkniecia"
                    label="Godz. zamknięcia"
                    placeholder="20:50"
                    
                />

                <Field
                    name="cena"
                    label="Cena"
                    placeholder="20"

                />
                <Field
                    name="nazwamiejscowosc"
                    label="Miejscowość"
                    placeholder="Miejscowość"
               /> 
               <Field
                    name="wycofana"
                    label="Wycofana"
                    hideInCreateForm
                    hideInUpdateForm
                />
            </Fields>
            <CreateForm

                title="Dodawanie"
                message="Dodajesz nowy wiersz!"
                trigger="Dodaj"
                onSubmit={task => service.create(task)}
                submitText="Dodaj"

                validate={(values) => {
                    const errors = {};
                    if (!values.nazwa) {
                        errors.nazwa = 'Wypełnij to pole.';
                    }
					 else if (values.nazwa ==='') {
                        errors.nazwa = 'Wypełnij to pole!';
                    }

                    if (!values.adres) {
                        errors.adres = 'Wypełnij to pole!';
                    }
					 else if (values.adres ==='') {
                        errors.adres = 'Wypełnij to pole!';
                    }


                    if (!values.liczba_miejsc) {
                        errors.liczba_miejsc = 'Wypełnij to pole.';
                    }
					else if (isNaN(values.liczba_miejsc)) {
						errors.liczba_miejsc = 'Wypełnij to pole liczbą!';
					}
                    if (!values.godzina_otwarcia) {
                        errors.godzina_otwarcia = 'Wypełnij to pole.';
                    }
                    if (!values.godzina_zamkniecia) {
                        errors.godzina_zamkniecia = 'Wypełnij to pole.';
                    }
                    if (!values.cena) {
                        errors.cena = 'Wypełnij to pole liczba.';
                    }
					else if (isNaN(values.cena)) {
						errors.liczba_miejsc = 'Wypełnij to pole liczbą!';
					}
                    if (!values.nazwamiejscowosc) {
                        errors.nazwamiejscowosc = 'Wypełnij to pole.';
                    }
					else if (values.nazwamiejscowosca ==='') {
                        errors.nazwamiejscowosc = 'Wypełnij to pole!';
                    }


                    if (tasks.find((element) => {return element.nazwa === values.nazwa})) {
                        errors.nazwa = 'Atrakcja o takiej nazwie istnieje!';
                    }

                    return errors;
                }}
            />

            <UpdateForm

                title="Modyfikacja"
                message="Modyfikujesz podany wiersz!"
                trigger="Zmodyfikuj"
                onSubmit={task => service.update(task)}
                submitText="Zmodyfikuj"
                validate={(values) => {
                    const errors = {};

                    if (!values.id) {
                        errors.id = 'Wypełnij to pole.';
                    }
					else if (isNaN(values.id)) {
						errors.liczba_miejsc = 'Wypełnij to pole liczbą!';
					}

                    if (!values.nazwa) {
                        errors.nazwa = 'Wypełnij to pole.';
                    }
					else if (values.nazwa == ' ') {
                        errors.nz = 'Wypełnij to pole!';
					}
                    if (!values.adres) {
                        errors.adres = 'Wypełnij to pole.';
                    }
					else if (values.adres == ' ') {
                        errors.adres = 'Wypełnij to pole!';
					}

                    if (!values.liczba_miejsc) {
                        errors.liczba_miejsc = 'Wypełnij to pole.';
                    }
					else if (isNaN(values.liczba_miejsc)) {
						errors.liczba_miejsc = 'Wypełnij to pole liczbą!';
					}
					
                    if (!values.godzina_otwarcia) {
                        errors.godzina_otwarcia = 'Wypełnij to pole.';
                    }
                    if (!values.godzina_zamkniecia) {
                        errors.godzina_zamkniecia = 'Wypełnij to pole.';
                    }

                    if (!values.cena) {
                        errors.cena = 'Wypełnij to pole.';
                    }
					else if (isNaN(values.cena)) {
						errors.cena = 'Wypełnij to pole liczbą!';
					}
					
                    if (!values.nazwamiejscowosc) {
                        errors.nazwamiejscowosc = 'Wypełnij to pole.';
                    }
					else if (values.nazwamiejscowosc == ' ') {
                        errors.nazwamiejscowosc = 'Wypełnij to pole!';
					}

                    //if (tasks.find((element) => {return element.nazwa === values.nazwa})) {
                     //   errors.nazwa = 'Atrakcja o takiej nazwie istnieje!';
                    //}

                    return errors;
                }}

            />

            <DeleteForm
                title="Wycofanie"
                message="Jesteś pewien, że chcesz wycofać tę atrakcję?"
                trigger="Wycofaj"
                onSubmit={task => service.delete(task)}
                submitText="Tak"
                validate={(values) => {
                const errors = {};
                if (!values.id) {
                    errors.id = 'Brak id';
                }
				else if (!values.adres>=0) {
                        errors.adres = 'Wypełnij to pole liczba!';
					}
                return errors;
                }}
            />

            <Pagination
                itemsPerPage={5}
                fetchTotalOfItems={payload => service.fetchTotal(payload)}
                activePage={1}
            />

        </CRUDTable>
    </div>
);

TabelaAtrakcja.propTypes = {};

export default TabelaAtrakcja;