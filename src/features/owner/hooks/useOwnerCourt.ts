import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerCourtApi, OwnerCourt, CourtPricingRule, CourtMaintenance, CourtAmenity, CourtSportAssignment } from '../api/owner-court.api';
import { toast } from 'sonner';

export const useOwnerCourts = (venueId: string) => {
    const queryClient = useQueryClient();

    const courtsQuery = useQuery({ 
        queryKey: ['owner_courts', venueId], 
        queryFn: () => ownerCourtApi.getCourtsByVenue(venueId),
        enabled: !!venueId
    });

    const createCourt = useMutation({
        mutationFn: (data: Partial<OwnerCourt>) => ownerCourtApi.createCourt({ ...data, venue_id: venueId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_courts', venueId] });
            toast.success("Đã thêm Sân mới thành công!");
        },
        onError: () => toast.error("Có lỗi xảy ra khi tạo Sân")
    });

    return {
        courts: courtsQuery.data || [],
        isLoading: courtsQuery.isLoading,
        createCourt: createCourt.mutate,
        isCreating: createCourt.isPending
    };
};

export const useOwnerCourtDetail = (courtId: string | null, venueId: string | null) => {
    const queryClient = useQueryClient();

    const updateCourt = useMutation({
        mutationFn: (data: Partial<OwnerCourt>) => ownerCourtApi.updateCourt(courtId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_courts', venueId] });
            toast.success("Cập nhật thông tin Sân thành công");
        },
        onError: () => toast.error("Cập nhật thông tin thất bại")
    });

    const deleteCourt = useMutation({
        mutationFn: () => ownerCourtApi.deleteCourt(courtId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_courts', venueId] });
            toast.success("Xóa sân thành công");
        },
        onError: () => toast.error("Xóa sân thất bại")
    });

    // PRICING RULES
    const pricingRulesQuery = useQuery({
        queryKey: ['owner_court_pricing', courtId],
        queryFn: () => ownerCourtApi.getPricingRules(courtId!),
        enabled: !!courtId
    });

    const createPricingRule = useMutation({
        mutationFn: (data: Partial<CourtPricingRule>) => ownerCourtApi.createPricingRule({ ...data, court_id: courtId! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_pricing', courtId] });
            toast.success("Đã thêm Bảng giá linh hoạt!");
        },
        onError: () => toast.error("Thêm bảng giá thất bại")
    });

    const deletePricingRule = useMutation({
        mutationFn: (id: string) => ownerCourtApi.deletePricingRule(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_pricing', courtId] });
            toast.success("Xóa Bảng giá linh hoạt thành công");
        },
        onError: () => toast.error("Xóa Bảng giá thất bại")
    });

    // MAINTENANCE
    const maintenanceQuery = useQuery({
        queryKey: ['owner_court_maintenance', courtId],
        queryFn: () => ownerCourtApi.getMaintenances(courtId!),
        enabled: !!courtId
    });

    const createMaintenance = useMutation({
        mutationFn: (data: Partial<CourtMaintenance>) => ownerCourtApi.createMaintenance({ ...data, court_id: courtId! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_maintenance', courtId] });
            toast.success("Đã đăng ký Lịch bảo trì!");
        },
        onError: () => toast.error("Đăng ký bảo trì thất bại")
    });

    const deleteMaintenance = useMutation({
        mutationFn: (id: string) => ownerCourtApi.deleteMaintenance(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_maintenance', courtId] });
            toast.success("Xóa Lịch bảo trì thành công");
        },
        onError: () => toast.error("Xóa Lịch bảo trì thất bại")
    });

    // AMENITIES
    const amenitiesQuery = useQuery({
        queryKey: ['owner_court_amenities', courtId],
        queryFn: () => ownerCourtApi.getAmenities(courtId!),
        enabled: !!courtId
    });

    const createAmenity = useMutation({
        mutationFn: (data: Partial<CourtAmenity>) => ownerCourtApi.createAmenity({ ...data, court_id: courtId! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_amenities', courtId] });
            toast.success("Thêm tiện ích thành công");
        },
        onError: () => toast.error("Thêm tiện ích thất bại")
    });

    const deleteAmenity = useMutation({
        mutationFn: (id: string) => ownerCourtApi.deleteAmenity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_amenities', courtId] });
            toast.success("Xóa tiện ích thành công");
        },
        onError: () => toast.error("Xóa tiện ích thất bại")
    });

    // SPORTS
    const sportsQuery = useQuery({
        queryKey: ['owner_court_sports', courtId],
        queryFn: () => ownerCourtApi.getSports(courtId!),
        enabled: !!courtId
    });

    const createSport = useMutation({
        mutationFn: (data: Partial<CourtSportAssignment>) => ownerCourtApi.createSport({ ...data, court_id: courtId! }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_sports', courtId] });
            toast.success("Thêm môn thể thao thành công");
        },
        onError: () => toast.error("Thêm môn thể thao thất bại")
    });

    const deleteSport = useMutation({
        mutationFn: (id: string) => ownerCourtApi.deleteSport(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owner_court_sports', courtId] });
            toast.success("Xóa môn thể thao thành công");
        },
        onError: () => toast.error("Xóa môn thể thao thất bại")
    });

    return {
        updateCourt: updateCourt.mutate,
        isUpdating: updateCourt.isPending,
        deleteCourt: deleteCourt.mutate,

        pricingRules: pricingRulesQuery.data || [],
        isLoadingPricing: pricingRulesQuery.isLoading,
        createPricingRule: createPricingRule.mutate,
        isCreatingPricingRule: createPricingRule.isPending,
        deletePricingRule: deletePricingRule.mutate,

        maintenances: maintenanceQuery.data || [],
        isLoadingMaintenance: maintenanceQuery.isLoading,
        createMaintenance: createMaintenance.mutate,
        isCreatingMaintenance: createMaintenance.isPending,
        deleteMaintenance: deleteMaintenance.mutate,

        amenities: amenitiesQuery.data || [],
        isLoadingAmenities: amenitiesQuery.isLoading,
        createAmenity: createAmenity.mutate,
        isCreatingAmenity: createAmenity.isPending,
        deleteAmenity: deleteAmenity.mutate,

        sports: sportsQuery.data || [],
        isLoadingSports: sportsQuery.isLoading,
        createSport: createSport.mutate,
        isCreatingSport: createSport.isPending,
        deleteSport: deleteSport.mutate,
    };
};
