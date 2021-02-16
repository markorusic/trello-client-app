import { FormikHelpers } from 'formik'
import i18next from 'i18next'
import { map } from 'lodash'
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
}

export const collectionOptimisticUpdate = <
  MutationType extends Optional<Identifiable, 'id'>,
  DomainType extends Identifiable
>({
  getKey,
  mutationMapper
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
        if (mutationDto.id) {
          return map(old, i => (i.id === item.id ? { ...i, ...item } : i))
        }
        return [...(old ?? []), item]
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

export const createFormMutationOptions = <T = unknown, K = unknown>(
  actions: FormikHelpers<T>,
  errorMessage = 'commons.error'
): MutationOptions<T, unknown, K> => ({
  onSuccess: () => actions.resetForm(),
  onError: () => {
    notyf.error(i18next.t(errorMessage))
  },
  onSettled: () => actions.setSubmitting(false)
})
