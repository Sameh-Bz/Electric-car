/**
 * Wasp API
 * REST API for the Wasp node
 *
 * OpenAPI spec version: 0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

export class NativeToken {
    'amount': string;
    'id': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "string",
            "format": "string"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": "string"
        }    ];

    static getAttributeTypeMap() {
        return NativeToken.attributeTypeMap;
    }

    public constructor() {
    }
}

