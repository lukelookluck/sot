using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Prev : MonoBehaviour, IPointerDownHandler
{

    public GameObject playerHolder;

    public void OnPointerDown(PointerEventData eventData)
    {
        playerHolder.GetComponent<SpawnProjectiles>().Previous();
    }

}
