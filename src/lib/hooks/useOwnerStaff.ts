import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueService } from '@/lib/api/services/venue.service';
import { useToast } from '@/components/ui/use-toast';

export const useOwnerStaff = (params?: any) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const staffQuery = useQuery({
        queryKey: ['owner-staff', params],
        queryFn: () => venueService.getOwnerStaff(params),
    });

    const addStaffMutation = useMutation({
        mutationFn: (data: { email: string; venueId: string }) => venueService.addOwnerStaff(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-staff'] });
            toast({ title: 'Staff assigned successfully' });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'Action failed';
            toast({
                title: 'Failed to assign staff',
                description: Array.isArray(message) ? message[0] : message,
                variant: 'destructive'
            });
        }
    });

    const removeStaffMutation = useMutation({
        mutationFn: (id: string) => venueService.removeOwnerStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner-staff'] });
            toast({ title: 'Staff removed successfully' });
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || 'Action failed';
            toast({
                title: 'Failed to remove staff',
                description: Array.isArray(message) ? message[0] : message,
                variant: 'destructive'
            });
        }
    });

    return {
        staff: staffQuery.data || [],
        isLoading: staffQuery.isLoading,
        error: staffQuery.error,
        refetch: staffQuery.refetch,

        addStaff: addStaffMutation.mutateAsync,
        isAdding: addStaffMutation.isPending,

        removeStaff: removeStaffMutation.mutate,
        isRemoving: removeStaffMutation.isPending,

        toggleStatus: useMutation({
            mutationFn: (id: string) => venueService.toggleOwnerStaffStatus(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['owner-staff'] });
                toast({ title: 'Staff status updated' });
            },
            onError: (error: any) => {
                const message = error.response?.data?.message || error.message || 'Action failed';
                toast({
                    title: 'Failed to update status',
                    description: Array.isArray(message) ? message[0] : message,
                    variant: 'destructive'
                });
            }
        }).mutate,
    };
};
