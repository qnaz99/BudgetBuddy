import React, { useState, useEffect, useMemo} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import axios from 'axios';
import UseModal from './UseModal';

type PaymentMethod = "Credit card" | "Debit card" | "Cash"
type Category = "Groceries" | "Restaurants" | "Transportation/Fuel" | "Bills" | "Utilities" | "Health" | "Other" | "Paycheck" | "Gift"

interface Transaction {
    userId: string;
    amount: number;
    description: string;
    category: Category;
    paymentMethod: PaymentMethod;
    recurring: boolean
    recurringFreq?: number;
}


const Dashboard : React.FC = () => {
    const navigate = useNavigate();
    const params = useParams<Record<string, string | undefined>>();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const id = params.id
        console.log("ID IS " + id)
        if (!id) {
            navigate('/');
        }
        else {
            console.log("user id is: " + id)
            const uri = `http://localhost:3000/transaction?id=${id}`;
            const fetchTransactions = async () => {
                try {
                    const response = await axios.get(uri)
                    console.log(response.data)
                    setTransactions(response.data) 
                }
            catch (error) {
                console.error("Error fetching transactions:", error);
            }
            }
            fetchTransactions()
        }
    }, [navigate, params.id])

    const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
        () => [
            {
                header: "Amount",
                accessorKey: "amount",
                size: 150
            },
            {
                header: "Category",
                accessorKey: "category",
                size: 150
            },
            {
                header: "Payment method",
                accessorKey: "paymentMethod",
                size: 150
            },
            {
                header: "Description",
                accessorKey: "description",
                size: 200
            }
        ], [])
        
        const tableOptions: MRT_TableOptions<Transaction> = {
            columns,
            data: transactions,
          };
          
        const table = useMaterialReactTable(tableOptions);
    
    return (
        <div>
            <h1>Dashboard</h1>
            {/* <h2>{(transactions)}</h2> */}
            <MaterialReactTable table={table} />
            <UseModal />
        </div>
    )
}

export default Dashboard