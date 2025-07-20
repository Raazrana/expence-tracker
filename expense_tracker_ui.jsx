// ExpenseTracker.jsx
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const LOCAL_STORAGE_KEY = 'expense-tracker-data';

const defaultData = [
  { date: 'Jul 15, 2023', category: 'Food', amount: 450, notes: 'Lunch out' },
  { date: 'Jul 14, 2023', category: 'Travel', amount: 1200, notes: 'Taxi to Pokhara' },
  { date: 'Jul 12, 2023', category: 'Rent', amount: 10000, notes: '' },
];

const categoryOptions = ['Food', 'Travel', 'Rent', 'Shopping', 'Utilities', 'Entertainment'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '', notes: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      setExpenses(defaultData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const categoryData = Object.values(
    expenses.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  const weeklyData = [
    { name: 'Week 1', amount: 3200 },
    { name: 'Week 2', amount: 4000 },
    { name: 'Week 3', amount: 2900 },
    { name: 'Week 4', amount: 4250 },
  ];

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = () => {
    setFormError('');
    setFormSuccess('');

    if (!newExpense.date || !newExpense.category || !newExpense.amount) {
      setFormError('Please fill out Date, Category, and Amount.');
      return;
    }

    const updated = [...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }];
    setExpenses(updated);
    setNewExpense({ date: '', category: '', amount: '', notes: '' });
    setFormSuccess('Expense added successfully!');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ... rest of the JSX remains unchanged ... */}
      {/* Existing return content here */}
    </div>
  );
};

export default ExpenseTracker;
