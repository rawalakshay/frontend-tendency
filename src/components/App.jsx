import { Table, Container, Pagination, Button, Spacer, Modal, Text, Input } from '@nextui-org/react';
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
    const [visible, setVisible] = useState(false)

    const closeHandler = () => {
        setVisible(false);
    }

    const openHandler = () => {
        setVisible(true);
    }

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
                <div>
                    <Spacer y={0.5} />

                    <Button auto color="primary" onClick={openHandler}>
                        Add Order
                    </Button>
                    <Spacer y={0.5} />
                    <Table
                        bordered
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
                        <Table.Pagination
                            noMargin
                            align="center"
                            rowsPerPage={5}
                            onPageChange={(page) => console.log({ page })}
                        />
                    </Table>
                </div>

                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            <Text b size={18}>
                                Add a New Order
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="SKU"
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Name"
                        />
                         <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Quantity"
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Price"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Close
                        </Button>
                        <Button auto onPress={closeHandler}>
                            Add Order
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>

    );
}

export default App