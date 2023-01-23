import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

import { generateProgressPorcentage } from "../utils/generate-progress-porcentage";
import dayjs from "dayjs";

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number,
    amountCompleted?: number,
    date: Date
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {
    const amountAccomplishedPorcentage = amountOfHabits > 0 ? generateProgressPorcentage(amountOfHabits, amountCompleted) : 0
    const today = dayjs().startOf("day").toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            className={clsx('rounded-lg border-2 m-1', {
                ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPorcentage === 0,
                ["bg-violet-900 border-violet-700"]: amountAccomplishedPorcentage > 0 && amountAccomplishedPorcentage < 20,
                ["bg-violet-800 border-violet-600"]: amountAccomplishedPorcentage >= 20 && amountAccomplishedPorcentage < 40,
                ["bg-violet-700 border-violet-500"]: amountAccomplishedPorcentage >= 40 && amountAccomplishedPorcentage < 60,
                ["bg-violet-600 border-violet-500"]: amountAccomplishedPorcentage >= 60 && amountAccomplishedPorcentage < 80,
                ["bg-violet-500 border-violet-400"]: amountAccomplishedPorcentage >= 80,
                ['border-white border-4']: isCurrentDay
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        >
            
        </TouchableOpacity>
    )
}