import { Container } from 'typedi'
import ResourceService from "./resource/resource.service"

const resourceService = Container.get(ResourceService);

export default class Seeder {

    seedResource = async () => {
        const data = await resourceService.getResources();
        if (data.length !== 0) {
            return;
        }
        // const roles = await Role.find().exec();

        // let admin_id = roles.find(r => r.name == "admin");
        // let basic_id = roles.find(r => r.name == "basic");
        // let user_id = roles.find(r => r.name == "user");

        let resources = [{
            name: "user",
            slug: "user",
            "resources_roles": [
                {
                    "role_name": "globalManager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "manager",
                    "create": false,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "regular",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": true
                }
            ]
        },
        {
            name: "group",
            slug: "group",
            "resources_roles": [
                {
                    "role_name": "globalManager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "manager",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": true
                },
                {
                    "role_name": "regular",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": false
                }
            ]
        },
        {
            name: "collection",
            slug: "collection",
            "resources_roles": [
                {
                    "role_name": "globalManager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "manager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "regular",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": false
                }
            ]
        },
        {
            name: "item",
            slug: "item",
            "resources_roles": [
                {
                    "role_name": "globalManager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "manager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "regular",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": false
                }
            ]
        },
        {
            name: "role",
            slug: "role",
            "resources_roles": [
                {
                    "role_name": "globalManager",
                    "create": true,
                    "delete": true,
                    "update": true,
                    "read": true
                },
                {
                    "role_name": "manager",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": false
                },
                {
                    "role_name": "regular",
                    "create": false,
                    "delete": false,
                    "update": false,
                    "read": false
                }
            ]
        }
    ]

    resourceService.createResource(resources);
    }
}