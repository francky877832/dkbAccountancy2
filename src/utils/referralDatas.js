
export const referralDatas = [
    {
		name : "Classement Mensuel",
        iconName : 'trophy',
        iconType : 'font-awesome',
		component : "ReferralDetails",
		renderItem : 'MonthlyRankingRenderItem',
		available : true,
	},
	{
		name : "Historique Cadeau",
        iconName : 'gift',
        iconType : 'font-awesome',
		component : "ReferralDetails",
		renderItem : 'GiftHistoryRenderItem',
		available : true,
	},
	{
		name : "Historique Points",
        iconName : 'star',
        iconType : 'font-awesome',
		component : "ReferralDetails",
		renderItem : 'PointsHistoryRenderItem',
		available : true,
	},
    {
		name : "Filleuls Parrainés",
        iconName : 'users',
        iconType : 'font-awesome',
		component : "ReferralDetails",
		renderItem : 'ReferredRenderItem',
		available : true,
	},
	
]