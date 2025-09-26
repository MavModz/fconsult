// test.js

export default {
  Transportation: () => ({
    type: 'transportation',
    transportation_field: {
      class: 'Bus',
      type: 'Road Transportation',
      country: null,
      city: null,
      state: null,
      street: null,
      zip_code: null,
      price: null,
      rating: null,
      tags: null,
      description: null,
    }
  }),

  Transfer: () => ({
    type: 'transfer',
    transfer_field: {
      class: null,
      arrival: null,
      departure: null,
      stopage: null,
      company: null,
      departure_location: null,
      destination_location: null,
      price: null,
      tags: null,
      description: null,
    }
  }),

  Destination: () => ({
    type: 'destination',
    destination_field: {
      country: null,
      state: null,
      city: null,
      street: null,
      zip_code: null,
      tags: null,
      description: null,
    }
  }),

  ccommodation: () => ({
    type: 'accommodation',
    accommodation_field: {
      name: null,
      type: null,
      room_type: null,
      price: null,
      rating: null,
      amenities: null,
      tags: null,
      description: null,
    }
  }),

  activities: () => ({
    type: 'activities',
    activities_field: {
      name: null,
      activity_type: null,
      location: null,
      price: null,
      rating: null,
      tags: null,
      description: null,
    }
  }),

  custom: () => ({
    type: 'custom',
    custom_field: {
      title: null,
      details: null,
      notes: null,
      tags: null,
      description: null,
    }
  })
};
