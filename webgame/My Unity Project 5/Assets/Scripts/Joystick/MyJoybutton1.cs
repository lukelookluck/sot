using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class MyJoybutton1 : MonoBehaviour, IDragHandler, IPointerUpHandler, IPointerDownHandler, IBeginDragHandler
{
    public GameObject indicator;
    public GameObject playerHolder;
    public Vector3 direction;

    public Sprite[] images;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        indicator.SetActive(true);
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        playerHolder.GetComponent<PlayerMovement>().dragged = true;
    }

    public void OnDrag(PointerEventData eventData)
    {
        Vector2 value = eventData.position - (Vector2)transform.position;

        direction = Vector3.up * Vector2.SignedAngle(value, Vector2.up);
        indicator.transform.rotation = Quaternion.Euler(direction);
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        indicator.SetActive(false);
        playerHolder.GetComponent<SpawnProjectiles>().SpawnVFXs(indicator.transform.rotation);
        playerHolder.GetComponent<PlayerMovement>().dragged = false;
    }

    
}
