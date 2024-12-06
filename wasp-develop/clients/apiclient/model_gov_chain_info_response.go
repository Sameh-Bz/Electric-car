/*
Wasp API

REST API for the Wasp node

API version: 0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package apiclient

import (
	"encoding/json"
)

// checks if the GovChainInfoResponse type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &GovChainInfoResponse{}

// GovChainInfoResponse struct for GovChainInfoResponse
type GovChainInfoResponse struct {
	// ChainID (Bech32-encoded).
	ChainID string `json:"chainID"`
	// The chain owner address (Bech32-encoded).
	ChainOwnerId string `json:"chainOwnerId"`
	GasFeePolicy FeePolicy `json:"gasFeePolicy"`
	GasLimits Limits `json:"gasLimits"`
	Metadata GovPublicChainMetadata `json:"metadata"`
	// The fully qualified public url leading to the chains metadata
	PublicURL string `json:"publicURL"`
}

// NewGovChainInfoResponse instantiates a new GovChainInfoResponse object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewGovChainInfoResponse(chainID string, chainOwnerId string, gasFeePolicy FeePolicy, gasLimits Limits, metadata GovPublicChainMetadata, publicURL string) *GovChainInfoResponse {
	this := GovChainInfoResponse{}
	this.ChainID = chainID
	this.ChainOwnerId = chainOwnerId
	this.GasFeePolicy = gasFeePolicy
	this.GasLimits = gasLimits
	this.Metadata = metadata
	this.PublicURL = publicURL
	return &this
}

// NewGovChainInfoResponseWithDefaults instantiates a new GovChainInfoResponse object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewGovChainInfoResponseWithDefaults() *GovChainInfoResponse {
	this := GovChainInfoResponse{}
	return &this
}

// GetChainID returns the ChainID field value
func (o *GovChainInfoResponse) GetChainID() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.ChainID
}

// GetChainIDOk returns a tuple with the ChainID field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetChainIDOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ChainID, true
}

// SetChainID sets field value
func (o *GovChainInfoResponse) SetChainID(v string) {
	o.ChainID = v
}

// GetChainOwnerId returns the ChainOwnerId field value
func (o *GovChainInfoResponse) GetChainOwnerId() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.ChainOwnerId
}

// GetChainOwnerIdOk returns a tuple with the ChainOwnerId field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetChainOwnerIdOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ChainOwnerId, true
}

// SetChainOwnerId sets field value
func (o *GovChainInfoResponse) SetChainOwnerId(v string) {
	o.ChainOwnerId = v
}

// GetGasFeePolicy returns the GasFeePolicy field value
func (o *GovChainInfoResponse) GetGasFeePolicy() FeePolicy {
	if o == nil {
		var ret FeePolicy
		return ret
	}

	return o.GasFeePolicy
}

// GetGasFeePolicyOk returns a tuple with the GasFeePolicy field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetGasFeePolicyOk() (*FeePolicy, bool) {
	if o == nil {
		return nil, false
	}
	return &o.GasFeePolicy, true
}

// SetGasFeePolicy sets field value
func (o *GovChainInfoResponse) SetGasFeePolicy(v FeePolicy) {
	o.GasFeePolicy = v
}

// GetGasLimits returns the GasLimits field value
func (o *GovChainInfoResponse) GetGasLimits() Limits {
	if o == nil {
		var ret Limits
		return ret
	}

	return o.GasLimits
}

// GetGasLimitsOk returns a tuple with the GasLimits field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetGasLimitsOk() (*Limits, bool) {
	if o == nil {
		return nil, false
	}
	return &o.GasLimits, true
}

// SetGasLimits sets field value
func (o *GovChainInfoResponse) SetGasLimits(v Limits) {
	o.GasLimits = v
}

// GetMetadata returns the Metadata field value
func (o *GovChainInfoResponse) GetMetadata() GovPublicChainMetadata {
	if o == nil {
		var ret GovPublicChainMetadata
		return ret
	}

	return o.Metadata
}

// GetMetadataOk returns a tuple with the Metadata field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetMetadataOk() (*GovPublicChainMetadata, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Metadata, true
}

// SetMetadata sets field value
func (o *GovChainInfoResponse) SetMetadata(v GovPublicChainMetadata) {
	o.Metadata = v
}

// GetPublicURL returns the PublicURL field value
func (o *GovChainInfoResponse) GetPublicURL() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.PublicURL
}

// GetPublicURLOk returns a tuple with the PublicURL field value
// and a boolean to check if the value has been set.
func (o *GovChainInfoResponse) GetPublicURLOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.PublicURL, true
}

// SetPublicURL sets field value
func (o *GovChainInfoResponse) SetPublicURL(v string) {
	o.PublicURL = v
}

func (o GovChainInfoResponse) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o GovChainInfoResponse) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["chainID"] = o.ChainID
	toSerialize["chainOwnerId"] = o.ChainOwnerId
	toSerialize["gasFeePolicy"] = o.GasFeePolicy
	toSerialize["gasLimits"] = o.GasLimits
	toSerialize["metadata"] = o.Metadata
	toSerialize["publicURL"] = o.PublicURL
	return toSerialize, nil
}

type NullableGovChainInfoResponse struct {
	value *GovChainInfoResponse
	isSet bool
}

func (v NullableGovChainInfoResponse) Get() *GovChainInfoResponse {
	return v.value
}

func (v *NullableGovChainInfoResponse) Set(val *GovChainInfoResponse) {
	v.value = val
	v.isSet = true
}

func (v NullableGovChainInfoResponse) IsSet() bool {
	return v.isSet
}

func (v *NullableGovChainInfoResponse) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableGovChainInfoResponse(val *GovChainInfoResponse) *NullableGovChainInfoResponse {
	return &NullableGovChainInfoResponse{value: val, isSet: true}
}

func (v NullableGovChainInfoResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableGovChainInfoResponse) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


