interface Resource {
    _id: string;
    name: string;
    slug: string;
    resources_roles: [{
        role_name: string
        create:   Boolean 
        delete:  Boolean 
        update:  Boolean 
        read:  Boolean
    }]
  }
  
  export default Resource;
  