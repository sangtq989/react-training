import GeneralSection from './GeneralSection.tsx';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {Fragment} from "react";

type Entry = { type: string; amount: number };

type FinancialStatusForm = {
    incomes: Entry[];
    assets: Entry[];
    liabilities: Entry[];
    sourceOfWealth: Entry[];
    investmentExp: { expAmount: number; riskTolerance: string }
};
const sum = (arr: Entry[] | undefined): number => {
    if (!arr) return 0;
    return arr.reduce((acc, cur) => acc + cur.amount, 0);
};

function calculateSum(obj: { [key: string]: Entry[] }): number {
    let total: number = 0;
    for (const key in obj) {
        obj[key]?.forEach((entry) => {
            total += +entry.amount;
        });
    }
    return total;
}

const KycForm = () => {
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FinancialStatusForm>();


    const incomes = useFieldArray({control, name: "incomes"});
    const assets = useFieldArray({control, name: "assets"});
    const liabilities = useFieldArray({control, name: "liabilities"});
    const sourceOfWealth = useFieldArray({control, name: "sourceOfWealth"});

    const watchAll = watch();

    const onSubmit = (data: FinancialStatusForm) => {
        console.log('Submitted data:', data);
    };
    return (
        <form className="p-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <GeneralSection register={register} errors={errors}/>
            <div
                className="p-2 mb-4 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Financial Status</h3>
                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium" style={{color: "var(--primary-color)"}}>Incomes (A)</h3>
                    {incomes.fields.length == 0 ? (<span>Add your source of income here</span>) : ""}

                    {incomes.fields.map((field, index) => (
                        <div key={field.id}>
                            <div className="pt-2 grid grid-cols-2 gap-4">
                                <Controller
                                    name={`incomes.${index}.type`}
                                    control={control}
                                    render={({field}) => <div className="flex flex-col justify-center items-start">
                                        <label htmlFor={"income-type"}
                                               className="block font-medium text-sm">Type</label>
                                        <select
                                            {...field}
                                            id="income-type"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                            <option value="salary">Salary</option>
                                            <option value="investment">Investment</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    }
                                />
                                <Controller
                                    name={`incomes.${index}.amount`}
                                    control={control}
                                    render={({field}) => <div className="flex flex-col justify-center items-start">
                                        <label htmlFor={"income-amount"} className="block font-medium text-sm">Amount
                                            (Currency)</label>
                                        <div className="flex justify-end mt-2 w-full gap-2">
                                            <input
                                                {...field}
                                                {...register(`incomes.${index}.amount`, {
                                                    required: true,
                                                    min: {value: 100, message: "Minimum amount should be 100"}
                                                })}
                                                type="number"
                                                id="income-amount"
                                                className={`
                                                     w-full shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700
                                                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                                                     ${errors.incomes?.[index]?.amount ? 'border-red-500' : 'border-gray-300'} 
                                                 `}
                                                placeholder="Enter amount"
                                                required/>
                                            <button type="button"
                                                    className="px-3 py-0 my-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                                                    onClick={() => incomes.remove(index)}>
                                                X
                                            </button>
                                        </div>

                                    </div>}/>
                            </div>
                            <div className="pt-2 grid grid-cols-2">
                                <p className="col-start-2 pl-3 text-red-500 text-sm">
                                    {errors.incomes ? errors.incomes[index]?.amount?.message : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                    <button type="button"
                            className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={() => incomes.append({type: "salary", amount: 0})}
                    >Add Income
                    </button>

                </div>

                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium" style={{color: "var(--primary-color)"}}>Assets (B)</h3>
                    {assets.fields.map((field, index) => (
                        <div key={field.id}>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Controller control={control} name={`assets.${index}.type`} render={({field}) =>
                                    <div>
                                        <label htmlFor={"asset-type"} className="block text-sm font-medium">Type</label>
                                        <select
                                            {...field}
                                            id="asset-type"
                                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                            <option value="bond">Bond</option>
                                            <option value="liquidity">Liquidity</option>
                                            <option value="real-estate">Real Estate</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                }/>
                                <Controller
                                    control={control}
                                    name={`assets.${index}.amount`}
                                    render={({field}) => (
                                        <div>
                                            <label htmlFor="asset-amount" className="block text-sm font-medium">Amount
                                                (Currency)</label>
                                            <div className="flex justify-end mt-2 w-full gap-2">
                                                <input
                                                    {...field}
                                                    {...register(`assets.${index}.amount`, {
                                                        required: true,
                                                        min: {value: 100, message: "Minimum amount should be 100"}
                                                    })}
                                                    type="number"
                                                    id="asset-amount"
                                                    className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                                    placeholder="Enter amount"
                                                    required
                                                />
                                                <button type="button"
                                                        className="px-3 py-0 my-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                                                        onClick={() => assets.remove(index)}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="pt-2 grid grid-cols-2">
                                <p className="col-start-2 pl-3 text-red-500 text-sm">
                                    {errors.assets ? errors.assets[index]?.amount?.message : ""}
                                </p>
                            </div>
                        </div>

                    ))}
                    <button type="button"
                            onClick={() => assets.append({type: "bond", amount: 0})}
                            className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 mt-4 rounded-md"> Add
                        Asset
                    </button>
                </div>

                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium" style={{color: "var(--primary-color)"}}>Liabilities (C)</h3>
                    <p className="text-sm mb-4 text-gray-600">
                        Liabilities are any outstanding debts or obligations you may have. These can include loans
                        such as personal loans, mortgages, or other forms of debt.
                    </p>

                    {liabilities.fields.map((field, index) => (
                        <Fragment key={field.id}>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Controller
                                    control={control}
                                    name={`liabilities.${index}.type`}
                                    render={({field}) => (
                                        <div>
                                            <label htmlFor={"liability-type"}
                                                   className="block text-sm font-medium">Type</label>
                                            <select
                                                {...field}
                                                id="liability-type"
                                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                                <option value="personal-loan">Personal Loan</option>
                                                <option value="real-estate-loan">Real Estate Loan</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={`liabilities.${index}.amount`}
                                    render={({field}) => (
                                        <div>
                                            <label htmlFor={"liability-amount"}
                                                   className="block text-sm font-medium">Amount
                                                (Currency)</label>
                                            <div className="flex justify-end mt-2 w-full gap-2">
                                                <input
                                                    {...field}
                                                    {...register(`liabilities.${index}.amount`, {
                                                        required: true,
                                                        min: {value: 100, message: "Minimum amount should be 100"}
                                                    })}
                                                    type="number"
                                                    id="liability-amount"
                                                    className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                                    placeholder="Enter amount"
                                                    required
                                                />
                                                <button type="button"
                                                        className="px-3 py-0 my-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                                                        onClick={() => liabilities.remove(index)}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="pt-2 grid grid-cols-2">
                                <p className="col-start-2 pl-3 text-red-500 text-sm">
                                    {errors.liabilities ? errors.liabilities[index]?.amount?.message : ""}
                                </p>
                            </div>
                        </Fragment>

                    ))}

                    <div className="mt-4">
                        <label htmlFor={"liabilities-total"} className="block text-sm font-medium">Total
                            Liabilities</label>
                        <input
                            value={watchAll.liabilities?.reduce((total, item) => total + Number(item.amount), 0)}
                            id="liabilities-total"
                            className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                            placeholder="Calculated Total"
                            readOnly
                        />

                    </div>
                    <button type="button"
                            className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={() => liabilities.append({type: "personal-loan", amount: 0})}
                    >Add Liability
                    </button>
                </div>

                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium" style={{color: "var(--primary-color)"}}>Source of Wealth
                        (D)</h3>
                    <p className="text-sm mb-4 text-gray-600">
                        This section identifies the origin of your wealth, such as any inheritance or donations you
                        may have received. It's important for financial transparency.
                    </p>
                    {sourceOfWealth.fields.map((field, index) => (
                        <Fragment key={field.id}>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Controller control={control} name={`sourceOfWealth.${index}.type`}
                                            render={({field}) => (
                                                <div>
                                                    <label htmlFor={"wealth-type"}
                                                           className="block text-sm font-medium">Type</label>
                                                    <select
                                                        value={field.value}
                                                        id="wealth-type"
                                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                                        <option value="inheritance">Inheritance</option>
                                                        <option value="donation">Donation</option>
                                                    </select>
                                                </div>
                                            )}
                                />
                                <Controller control={control} name={`sourceOfWealth.${index}.amount`}
                                            render={(formField) => (
                                                <div>
                                                    <label htmlFor={"wealth-amount"}
                                                           className="block text-sm font-medium">Amount
                                                        (Currency)</label>
                                                    {/*<pre>{JSON.stringify(formField)}</pre>*/}
                                                    <input
                                                        {...formField.field}
                                                        {...register(`sourceOfWealth.${index}.amount`, {
                                                            required: true,
                                                            min: {value: 100, message: "Minimum amount should be 100"}
                                                        })}
                                                        type="number"
                                                        id="wealth-amount"
                                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                                                        placeholder="Enter amount"
                                                        required
                                                    />
                                                </div>
                                            )}
                                />
                            </div>
                            <div className="pt-2 grid grid-cols-2">
                                <p className="col-start-2 pl-3 text-red-500 text-sm">
                                    {errors.sourceOfWealth ? errors.sourceOfWealth[index]?.amount?.message : ""}
                                </p>
                            </div>
                        </Fragment>

                    ))}

                    <div className="mt-4">
                        <label htmlFor={"wealth-total"} className="block text-sm font-medium">Total Source of
                            Wealth</label>
                        <input
                            value={Number(sum(watchAll.sourceOfWealth))}
                            id="wealth-total"
                            className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                            placeholder="Calculated Total"
                            readOnly
                        />
                    </div>
                    <button type="button"
                            className="bg-primary-500 hover:bg-primary-400 text-white px-4 py-2 mt-4 rounded-md"
                            onClick={() => sourceOfWealth.append({type: "inheritance", amount: 0})}
                    >Add Source of Wealth
                    </button>
                </div>

                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium mb-4" style={{color: "var(--primary-color)"}}>Net Worth</h3>
                    <div>
                        <label htmlFor={"net-worth-total"} className="block text-sm font-medium">Total</label>
                        <input
                            value={
                                calculateSum({
                                    incomes: watchAll.incomes ?? [],
                                    assets: watchAll.assets ?? [],
                                    liabilities: watchAll.liabilities ?? [],
                                    sourceOfWealth: watchAll.sourceOfWealth ?? []
                                })
                            }
                            id="net-worth-total"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                            placeholder="Automatically calculated"
                            disabled
                        />
                    </div>
                </div>

                <div className="flex flex-col p-3 border border-slate-300 rounded-2xl my-4">
                    <h3 className="text-lg font-medium mb-4" style={{color: "var(--primary-color)"}}>Investment
                        Experience and Objectives</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={"investment-experience"} className="block text-sm font-medium">Experience
                                in Financial Markets</label>
                            <select
                                id="investment-experience"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                <option value="<5-years">&lt; 5 years</option>
                                <option value="5-10-years">&gt; 5 and &lt; 10 years</option>
                                <option value=">10-years">&gt; 10 years</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor={"risk-tolerance"} className="block text-sm font-medium">Risk
                                Tolerance</label>
                            <select
                                id="risk-tolerance"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color">
                                <option value="10%">10%</option>
                                <option value="30%">30%</option>
                                <option value="all-in">All-in</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/*<pre>{JSON.stringify(watchAll)}</pre>*/}
                <div className="flex items-center justify-end w-full">
                    <button type="submit" className="bg-primary-500 p-2 border text-white rounded-md">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default KycForm;
