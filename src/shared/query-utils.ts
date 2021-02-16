/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers } from 'formik'
import i18next from 'i18next'
import { identity, map } from 'lodash'
import { MutationOptions, QueryKey, UseMutationOptions } from 'react-query'
import { Optional } from 'utility-types'
import { notyf } from '../config/notify'
import { queryClient } from '../config/query-client'

export interface Identifiable {
  id: string
}

export interface OptimisticUpdateOptions<MutationType, DomainType> {
  getKey: (mutationDto: MutationType) => QueryKey
  mutationMapper: (mutationDto: MutationType) => DomainType
  mapCollection?: (items: DomainType[]) => DomainType[]
}

export const collectionOptimisticUpdate = <
  MutationType extends Optional<Identifiable, 'id'>,
  DomainType extends Identifiable
>({
  getKey,
  mutationMapper,
  mapCollection = identity
}: OptimisticUpdateOptions<MutationType, DomainType>) => {
  const mutationOptions: UseMutationOptions<
    DomainType,
    unknown,
    MutationType,
    {
      key: QueryKey
      previousItems: DomainType[] | undefined
      item: DomainType
    }
  > = {
    onMutate: async (mutationDto: MutationType) => {
      const item = mutationMapper(mutationDto)
      const key = getKey(mutationDto)
      await queryClient.cancelQueries(key)
      const previousItems = queryClient.getQueryData<DomainType[]>(key)
      queryClient.setQueryData<DomainType[]>(key, old => {
        let items: DomainType[] = []
        if (mutationDto.id) {
          items = map(old, i => (i.id === item.id ? { ...i, ...item } : i))
        } else {
          items = [...(old ?? []), item]
        }
        return mapCollection(items)
      })
      return { key, previousItems, item }
    },
    onSuccess: (item, _, context) => {
      if (context?.key) {
        queryClient.setQueryData<DomainType[]>(context.key, items =>
          map(items, i => (i.id === context?.item.id ? item : i))
        )
      }
    },
    onError: (_, __, context) => {
      if (context?.key) {
        queryClient.setQueryData(context.key, context?.previousItems)
      }
    }
  }

  return mutationOptions
}

export const createFormMutationOptions = (
  actions: FormikHelpers<any>,
  errorMessage = 'commons.error'
): MutationOptions<any, unknown, any> => ({
  onSuccess: () => actions.resetForm(),
  onError: () => {
    notyf.error(i18next.t(errorMessage))
  },
  onSettled: () => actions.setSubmitting(false)
})

export const deleteMutationOptions = (
  successMessage = 'commons.successfulDelete',
  errorMessage = 'commons.error'
): MutationOptions<any, unknown, any> => ({
  onSuccess: () => {
    notyf.success(i18next.t(successMessage))
  },
  onError: () => {
    notyf.error(i18next.t(errorMessage))
  }
})
