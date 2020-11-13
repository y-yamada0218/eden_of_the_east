class SearchConditions < ActiveHash::Base
  self.data = [ 
    {id: 1, name: '1時間以内', value: 1}, 
    {id: 2, name: '3時間以内', value: 3}, 
    {id: 3, name: '5時間以内', value: 5},
    {id: 4, name: '12時間以内', value: 12},
    {id: 5, name: '1日以内', value: 24},
    {id: 6, name: '3日以内', value: 72},
    {id: 7, name: '5日以内', value: 122},
    {id: 8, name: '1週間以内', value: 168},
    {id: 9, name: '1ヶ月以内', value: 720},
    {id: 10, name: '3ヶ月以内', value: 2160},
    {id: 11, name: '半年以内', value: 4320},
    {id: 12, name: '1年以内', value: 8760}
  ]
end