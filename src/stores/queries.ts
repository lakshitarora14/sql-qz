import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { uuid } from 'vue-uuid'

export const useQueriesStore = defineStore('queries', () => {
  const savedQueries = reactive(<Array<Record<string, any>>>[
    {
      id: uuid.v4(),
      name: 'Saved Query 1',
      query: `WITH employee_ranking AS (
        SELECT
      employee_id,
      last_name,
      first_name,
      salary,
      RANK() OVER (ORDER BY salary DESC) as ranking
  FROM employee
)
  SELECT
  employee_id,
    last_name,
    first_name,
    salary
  FROM employee_ranking
  WHERE ranking = 2`
    },
    {
      id: uuid.v4(),
      name: 'Saved Query 2',
      query: 'SELECT * FROM orders'
    }
  ])
  const queryHistory = reactive(<Array<Record<string, any>>>[
    {
      id: 'f0acef22-7f28-42b7-a607-e89fc64c4206',
      name: 'Query 1',
      time: '10/03/2024, 09:11:40',
      query: 'SELECT * FROM users',
      message: '1334234 rows returned',
      duration: '0.9sec'
    },
    {
      id: 'e4f8f371-c65a-432c-af41-97783a936665',
      name: 'Query 2',
      time: '10/03/2024, 09:11:58',
      query: 'SELECT * FROM orders',
      message: '1765563 rows returned',
      duration: '0.4sec'
    }
  ])
  const currentQueries = reactive(<Array<Record<string, any>>>[
    {
      id: 'f0acef22-7f28-42b7-a607-e89fc64c4206',
      name: 'Query 1',
      query: 'SELECT * FROM users Query 1'
    },
    {
      id: 'e4f8f371-c65a-432c-af41-97783a936665',
      name: 'Query 2',
      query: 'SELECT * FROM orders Query 2'
    }
  ])

  const curerntTab = ref(currentQueries[0].name)

  const queryHistoryCount = computed(() => queryHistory.length)

  const currentQueriesCount = computed(() => currentQueries.length)

  const queryHistoryData = computed(() => {
    return queryHistory
  })

  const savedQueriesData = computed(() => {
    return savedQueries
  })

  const currentQueriesData = computed(() => {
    return currentQueries
  })

  const getCurrentTab = computed(() => {
    return curerntTab.value
  })

  function saveQueryToList(listName: string, query: Record<string, any>) {
    const obj = {
      id: uuid.v4(),
      ...query
    }
    if (listName === 'savedQueries') {
      savedQueries.push(obj)
    } else if (listName === 'currentQueries') {
      currentQueries.push(obj)
    } else if (listName === 'queryHistory') {
      queryHistory.push(obj)
    }
  }

  function editSavedQuery(id: string, name: string, query: string) {
    const index = savedQueries.findIndex((query) => query.id === id)
    if (index !== -1) {
      savedQueries[index] = {
        id,
        name,
        query
      }
    }
  }

  function removeSavedQuery(id: string) {
    const item: any = savedQueries.find((query) => query.id === id)
    savedQueries.splice(savedQueries.indexOf(item), 1)
  }

  function removeHistoryQuery(id: string) {
    const item: any = queryHistory.find((query) => query.id === id)
    queryHistory.splice(queryHistory.indexOf(item), 1)
  }

  function removeCurrentQuery(name: string) {
    const item: any = currentQueries.find((query) => query.name === name)
    currentQueries.splice(currentQueries.indexOf(item), 1)
  }

  function setCurrentTab(tabName: string) {
    curerntTab.value = tabName
  }

  return {
    savedQueriesData,
    saveQueryToList,
    removeSavedQuery,
    queryHistoryData,
    queryHistoryCount,
    editSavedQuery,
    removeHistoryQuery,
    currentQueriesData,
    currentQueriesCount,
    removeCurrentQuery,
    getCurrentTab,
    setCurrentTab
  }
})
