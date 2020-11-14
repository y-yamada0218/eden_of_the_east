class SearchRange < ActiveHash::Base
  self.data = [ 
    {id: 1, name: '1km', value: 1}, 
    {id: 2, name: '3km', value: 3}, 
    {id: 3, name: '5km', value: 5},
    {id: 4, name: '10km', value: 10},
    {id: 5, name: '20km', value: 20}
  ]
end