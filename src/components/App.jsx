import { Table, Container, Pagination } from '@nextui-org/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {

    const columns = [
        {
            key: "sku",
            label: "SKU",
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "quantity",
            label: "Quantity",
        },
        {
            key: "price",
            label: "Price",
        },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('/api/data').then((response) => {
            let resData = JSON.parse(JSON.stringify(response.data));
            let itemsArr = [];

            resData.orders.forEach((f) => {
                itemsArr.push(f.items[0])
            })

            setRows(itemsArr);

        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <Container xl css={{ maxWidth: "60%" }}>
                <Table
                    aria-label="Example table with dynamic content"
                    css={{
                        height: "auto",
                    }}
                >
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column key={column.key}>{column.label}</Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={rows}>
                        {(item) => (
                            <Table.Row key={item.key}>
                                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Pagination total={5} initialPage={1} totalItems={rows.length} />
            </Container>
        </>

    );
}

export default App