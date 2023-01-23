import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, Alert } from "react-native";
import { useState, useCallback } from "react";
import dayjs from "dayjs";

import { api } from "../lib/axios"; 
import { generateDatesFromYearBeggining } from '../utils/generate-dates-from-year-beggining'

import { Loading, HabitDay, Header, DAY_SIZE } from "../components";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]
const dateFromYearStart = generateDatesFromYearBeggining()
const minimumSummaryDatesSizes = 10 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - dateFromYearStart.length

type SummaryProps = Array<{
    id: string,
    date: string,
    amount: number,
    completed: number  
}>

export function Home() {
    const [ loading, setLoading ] = useState(true)
    const [ summary, setSummary ]= useState<SummaryProps | null>(null)
    const { navigate } = useNavigation()

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get("/summary")
            setSummary(response.data)
        } catch(error) {
            Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos')
        } finally {
            setLoading(false)
        }   
    }

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    if(loading) {
        return <Loading />
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
           <Header />

           <View className="flex-row mb-2 mt-4">
                {
                    weekDays.map((weekDay, index) => (
                        <Text 
                            key={`${weekDay} - ${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {
                    summary &&
                    <View className="flex-row flex-wrap">
                        {
                            dateFromYearStart.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })

                                return (
                                    <HabitDay 
                                        date={date}
                                        amountOfHabits={dayWithHabits?.amount}
                                        amountCompleted={dayWithHabits?.completed}
                                        onPress={() => navigate('habit', { date: date.toISOString() })}
                                        key={date.toISOString()}
                                    />
                                )
                            })
                        }

                        {
                            amountOfDaysToFill > 0 
                            && Array.from({ length: amountOfDaysToFill })
                                    .map((_, index) => (
                                        <View
                                            key={index}
                                            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                            style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                        >
                                        </View>
                                    ))
                        }
                    </View>
                }
            </ScrollView>
        </View>
    )
}