<?php


namespace Codilar\HelloWorld\Api\Data;


/**
 * Interface PostInterface
 * @package Codilar\HelloWorrld\Api\Data
 * @api
 */
interface PostInterface
{
    const ID = 'id';
    const NAME = 'name';
    const ENTITY_ID = 'entity_id';
    const CREATED_AT = 'created_at';
    const CONTENT = 'content';

    /**
     * Get id
     * @return int
     */
    public function getId();

    /**
     * Set id
     * @param int $id
     * @return PostInterface
     */
    public function setId(int $id);

    /**
     * Get name
     * @return string
     */
    public function getName();

    /**
     * Set name
     * @param string $name
     * @return PostInterface
     */
    public function setName(string $name);

    /**
     * Get entity_id
     * @return int
     */
    public function getEntityId();

    /**
     * Set entity_id
     * @param int $id
     * @return PostInterface
     */
    public function setEntityId(int $id);

    /**
     * Get content
     * @return string
     */
    public function getContent();

    /**
     * Set content
     * @param string $content
     * @return PostInterface
     */
    public function setContent(string $content);

//    /**
//     * Get created_at
//     * @return string
//     */
//    public function getCreatedAt();
//
//    /**
//     * Set created_at
//     * @param string $createdAt
//     * @return PostInterface
//     */
//    public function setCreatedAt(string $createdAt);
}
