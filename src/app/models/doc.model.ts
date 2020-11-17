export interface Doc {
    title: string,
    descriptions: DocDescription[],

}

export interface DocDescription {
    text: string,
    code: string,
    imageUrl: string,
}