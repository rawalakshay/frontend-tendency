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
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");

    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [validForm, setValidForm] = useState(false);

    const closeHandler = () => {
        setVisible(false);
    }

    const openHandler = () => {
        setVisible(true);
    }

    let nameVar, quantityVar, priceVar, skuVar;

    const setSkuFn = (event) => {
        skuVar = event.target.value;
        setSku(event.target.value);
        checkFormValidation();
    }

    const setNameFn = (event) => {
        nameVar = event.target.value;
        setName(event.target.value);
        checkFormValidation();
    }

    const setQuantityFn = (event) => {
        quantityVar = event.target.value;
        setQuantity(event.target.value);
        checkFormValidation();
    }

    const setPriceFn = (event) => {
        priceVar = event.target.value;
        setPrice(event.target.value);
        checkFormValidation();
    }

    const addNewOrder = () => {
        if (sku == "") {
            console.log(`Empty SKU`);
        }
    }

    const checkFormValidation = () => {
        if (nameVar == "") {
            setValidForm(true);
        }
        if (quantityVar == "") {
            setValidForm(true);
        }
        if (priceVar == "") {
            setValidForm(true);
        }
        if (skuVar == "") {
            setValidForm(true);
        }

        if(nameVar != '' && quantityVar != '' && priceVar != '' && skuVar != '') {
            console.log('form is valid')
            setValidForm(false);
        }

    }

    const skuHelper = React.useMemo(() => {
        if (sku == '')
            return {
                text: "Enter SKU",
                color: "error",
            };
        else {
            return {
                text: "",
                color: "success",
            };
        }
    }, [sku]);

    const nameHelper = React.useMemo(() => {
        if (name == '')
            return {
                text: "Enter Name",
                color: "error",
            };
        else {
            return {
                text: "",
                color: "success",
            };
        }
    }, [name]);

    const quantityHelper = React.useMemo(() => {
        if (quantity == '')
            return {
                text: "Enter Qauntity",
                color: "error",
            };
        else {
            return {
                text: "",
                color: "success",
            };
        }
    }, [quantity]);

    const priceHelper = React.useMemo(() => {
        if (price == '')
            return {
                text: "Enter Price",
                color: "error",
            };
        else {
            return {
                text: "",
                color: "success",
            };
        }
    }, [price]);

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
                            size="lg"
                            placeholder="SKU"
                            onChange={setSkuFn}
                            color={skuHelper.color}
                            helperText={skuHelper.text}
                            helperColor={skuHelper.color}
                        />
                        <Spacer y={0.1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            size="lg"
                            placeholder="Name"
                            onChange={setNameFn}
                            color={nameHelper.color}
                            helperText={nameHelper.text}
                            helperColor={nameHelper.color}
                        />
                        <Spacer y={0.1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            size="lg"
                            placeholder="Quantity"
                            onChange={setQuantityFn}
                            color={quantityHelper.color}
                            helperText={quantityHelper.text}
                            helperColor={quantityHelper.color}
                        />
                        <Spacer y={0.1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            size="lg"
                            placeholder="Price"
                            onChange={setPriceFn}
                            color={priceHelper.color}
                            helperText={priceHelper.text}
                            helperColor={priceHelper.color}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Close
                        </Button>
                        <Button auto onClick={addNewOrder} disabled={validForm}>
                            Add Order
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>

    );
}

export default App