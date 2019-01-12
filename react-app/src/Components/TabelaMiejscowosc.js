import React//, { Component } 
    from 'react';

import CRUDTable,
{
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    // DeleteForm,
    Pagination
} from 'react-crud-table';

import axios from 'axios';

// Component's Base CSS
import '../index.css';

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

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
        axios.post('/api/Uzytkownik/PanelAdmina2', {
            nazwaMiejscowosc: task.nazwamiejscowosc,
            kraj: task.kraj
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

        task.nazwamiejscowosc = data.nazwamiejscowosc;
        task.kraj = data.kraj;

        //console.log(task.kraj);

        axios.post('/api/Uzytkownik/Panel_Admina3', {
            id: task.id,
            nazwamiejscowosc: task.nazwamiejscowosc,
            kraj: task.kraj
        });

        return Promise.resolve(task);
    },

};

const styles = {
    container: {},
};

function Ustaw(props) {
    tasks = props.daneMiejscowosc;
    // alert(JSON.stringify((props.daneMiejscowosc)));
}

const TabelaMiejscowosc = (props) => (



    <div style={styles.container}>
        {Ustaw(props)}

        <CRUDTable style={{ width: '100%' }}
            caption="Miejscowość"
            actionsLabel="Akcje"
            fetchItems={payload => service.fetchItems(payload)}

        >
            <Fields>
                <Field
                    name="id"
                    label="Id"
                    hideInCreateForm
                    hideInUpdateForm

                />
                <Field
                    name="nazwamiejscowosc"
                    label="Nazwa"
                    placeholder="Nazwa"
                />
                <Field
                    name="kraj"
                    label="Kraj"
                    //placeholder="Kraj" - nie dziala

                    render={DescriptionRenderer}
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
                    if (!values.nazwamiejscowosc) {
                        errors.nazwamiejscowosc = 'Wypełnij to pole.';
                    }
					else if (values.nazwamiejscowosc == ' ') {
                        errors.nazwamiejscowosc = 'Wypełnij to pole!';
					}

                    if (!values.kraj) {
                        errors.kraj = 'Wypełnij to pole.';
                    }
					else if (values.kraj == ' ') {
                        errors.kraj = 'Wypełnij to pole!';
					}

                    if (tasks.find((element) => {return element.nazwamiejscowosc === values.nazwamiejscowosc})) {
                        errors.nazwamiejscowosc = 'Miejscowość o takiej nazwie istnieje!';
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

                    if (!values.nazwamiejscowosc) {
                        errors.nazwamiejscowosc = 'Wypełnij to pole.';
                    }
					else if (values.nazwamiejscowosc == ' ')) {
                        errors.adres = 'Wypełnij to pole!';
					}

                    if (!values.kraj) {
                        errors.kraj = 'Wypełnij to pole.';
                    }
					else if (values.kraj == ' ')) {
                        errors.kraj = 'Wypełnij to pole!';
					}

                    //if (tasks.find((element) => {return element.nazwamiejscowosc === values.nazwamiejscowosc})) {
                    //    errors.nazwamiejscowosc = 'Miejscowość o takiej nazwie istnieje!';
                    //}

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

TabelaMiejscowosc.propTypes = {};

export default TabelaMiejscowosc;