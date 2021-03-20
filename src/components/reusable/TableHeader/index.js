import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { CSVLink } from "react-csv";
import styled from 'styled-components'

const HContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items:center;
    justify-content: space-between;
`

const Set = styled.div`
    display:flex;
    align-items:center;
`

const TableHeader = (props) => {
    const [search, setSearch] = useState("");
    const { csvReport, title, addHandler, searchHandler } = props;

    return (
        <HContainer>
            <h3>{title}</h3>
            <Set>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search all"
                />
                <Button
                    variant="contained"
                    style={{ margin: "10px", background: "#800080" }}
                    color="primary"
                    onClick={() => searchHandler(search)}
                >
                    Search
                </Button>
                <Button
                    variant="contained"
                    style={{ margin: "10px", background: "#800080" }}
                    color="primary"
                    onClick={addHandler}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    style={{ margin: "10px", background: "#800080" }}
                >
                    <CSVLink {...csvReport} style={{ color: "white" }}>
                        Export CSV
                    </CSVLink>
                </Button>
            </Set>
        </HContainer>
    )
}

export default TableHeader;
