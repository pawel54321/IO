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
    delete: (data) => {
        const task = tasks.find(t => t.id === data.id);
        tasks = tasks.filter(t => t.id !== task.id);
        axios.post('/api/Uzytkownik/Anulowanie', {
            idBilet: data.id
        });

        return Promise.resolve(task);
      },

};

const styles = {
    container: {},

};

function Ustaw(props) {
    tasks = props.daneBilet;
    // alert(JSON.stringify((props.daneMiejscowosc)));
}

const TabelaRezerwacja = (props) => (



    <div style={styles.container}>
        {Ustaw(props)}

        <CRUDTable style={{ width: '100%' }}
            caption="Moje rezerwacje"
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
                    name="nazwaAtrakcji"
                    label="Nazwa Atrakcji"
                />
                  <Field
                    name="data"
                    label="data"
                />
                <Field
                    name="cena"
                    label="Cena"
                />

            </Fields>

            <DeleteForm
                title="Anulowanie"
                message="Jesteś pewien, że chcesz anulować rezerwację?"
                trigger="Anuluj"
                onSubmit={task => service.delete(task)}
                submitText="Anuluj"
                validate={(values) => {
                const errors = {};
                if (!values.id) {
                    errors.id = 'Brak id';
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
