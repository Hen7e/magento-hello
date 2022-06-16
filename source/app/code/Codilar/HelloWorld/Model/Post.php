<?php


namespace Codilar\HelloWorld\Model;

use Amazon\Core\Helper\Data;
use Codilar\HelloWorld\Api\Data\PostInterface;
use Magento\Framework\Api\DataObjectHelper;
use Magento\Framework\Data\Collection\AbstractDb;
use Magento\Framework\Model\AbstractModel;
use Magento\Framework\Model\Context;
use Codilar\HelloWorld\Api\Data\PostInterfaceFactory;
use Magento\Framework\Registry;
use Magento\TestFramework\Event\Magento;
use Magento\Tests\NamingConvention\true\mixed;


/**
 * Class Post
 * @package Codilar\HelloWorld\Model
 */
class Post extends AbstractModel implements PostInterface
{
    /**
     * @var PostInterfaceFactory
     */
    private $postFactory;

    /**
     * @var DataObjectHelper
     */
    private DataObjectHelper $dataObjectHelper;

    const CACHE_TAG = 'testTask_blog';

    protected $_cacheTag = 'testTask_blog';

    protected $_eventPrefix = 'testTask_blog';

    /**
     * Post constructor
     * @param Context $context
     * @param Registry $registry
     * @param PostInterfaceFactory $postFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param ResourceModel\AbstractResource|null $resource
     * @param AbstractDb|null $resourceCollection
     * @param array $data
     */
    public function __construct(
        Context $context,
        \Magento\Framework\Registry $registry,
        PostInterfaceFactory $postFactory,
        DataObjectHelper $dataObjectHelper,
        ResourceModel\AbstractResource $resource = null,
        AbstractDb $resourceCollection = null,
        array $data = [])
    {
        $this->dataObjectHelper = $dataObjectHelper;
        $this->postFactory = $postFactory;
        parent::__construct($context, $registry, $resource, $resourceCollection, $data);
    }

    /**
     * @return mixed
     */
    public function getDataModel()
    {
        $postData = $this->getData();

        $postDataObject = $this->postFactory->create();
        $this->dataObjectHelper->populateWithArray(
            $postDataObject,
            $postData,
            PostInterface::class
        );

        return $postDataObject;
    }

    protected function _construct()
    {
        $this->_init('Codilar\HelloWorld\Model\ResourceModel\Post');
    }

    public function getIdentities()
    {
        return [self::CACHE_TAG . '_' . $this->getId()];
    }

    public function getName()
    {
        return $this->getData(self::NAME);
    }

    public function setName(string $name)
    {
        return$this->setData(self::NAME, $name);
    }

    public function getContent()
    {
       return $this->getData(self::CONTENT);
    }

    public function setContent(string $content)
    {
        return $this->setData(self::CONTENT, $content);
    }
}
